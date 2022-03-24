import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable, Pipe } from '@angular/core';
import { User,Message } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';





//import * as firebase  from 'firebase';

@Injectable()
export class AuthService {

    user$:Observable<User>;
    user:User;
    currentUser:User;
    

  constructor(
    private afauth:AngularFireAuth, 
    private afs:AngularFirestore,
    private router:Router,
    private loadingctrl:LoadingController,
    private toastr:ToastController,
    
    ) 
  {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user=>
        {
          if(user)
          {
            return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
          }
          else{
            return of(null);
          }
        }
        )
    );
     
  }//end of constructor

  

  async login(email,pass)
  {
    const loading= await this.loadingctrl.create({
      message:'Authenticating...',
      spinner:'crescent',
      showBackdrop:true
    });
    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{

      this.afauth.signInWithEmailAndPassword(email, pass).then((data)=>
    {
    if(!data.user.emailVerified)
    {
      loading.dismiss();
      this.toast('please verify your email','danger');
      this.logout();
    }
    else
    {
      loading.dismiss();
      this.router.navigate(['/tabs']);
    }
    
  }) 
  .catch(error =>{
    loading.dismiss();
    this.toast(error.message,'danger');
  })
    })
    .catch(error =>{
      loading.dismiss();
      this.toast(error.message,'danger');
    })

    

  }//end of signin


  async logout()
  {
    const loading=await this.loadingctrl.create({
      spinner:'crescent',
      showBackdrop:true
    });
    loading.present();
    this.afauth.signOut().then(()=>{
      
      this.router.navigate(['/loginscreen']);
      loading.dismiss();
      })
  }
  
  async toast(message, status)
  {
    const toast=await this.toastr.create({
      message:message,
      position:'top',
      color:status,
      duration:2000
    });
    toast.present();
  }//end of toast

  getUId(){
    
        return this.user.userId
     
  }
  

  setUser(user:User){
    return this.user = user;
  }

  addChatMessage(msg){
    return this.afs.collection('messages').add({
      msg,
      from: this.currentUser.userId,
      createdAt:firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }
  
  getChatMessages(){
    let users=[];
    return this.getUsers().pipe(
      switchMap(res => {
        users=res;
        console.log('all users',users);
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({idField: 'id'}) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages ){
          m.fromName=this.getUsersMessages(m.from, users);
          m.myMsg=this.currentUser.userId===m.from;
        }
        console.log('all messages',messages);
        return messages;

      })
    )
  }
  getUsers(){
    return this.afs.collection('user').valueChanges({idField:'userId'}) as Observable<User[]>;
  }
  
  
  getUsersMessages(msgFromId,users:User[]):string{
    for(let usr of users){
      if(usr.userId==msgFromId){
        return usr.email;
      }
    }
    return 'Deleted';
  }
  getPublisherPost(postFromId, users:User[]):string{
    for (let usr of users){
      if(usr.userId==postFromId){
        return usr.name;
      }
    }
    return 'Deleted';
  }

  getPost(){
    let users=[];
    return this.getUsers().pipe(
      switchMap(res => {
        users=res;
        console.log('all users',users);
        return this.afs.collection('posts',ref =>ref.orderBy('createdAt')).valueChanges({idField: 'userId'}) as Observable<User[]>;
      }),
      map(posts => {
        for (let p of posts){
          p.name=this.getPublisherPost(p.name,users);
          
        }
        console.log('all users name',posts);
        return posts;
      })
    )
  }

 
}
