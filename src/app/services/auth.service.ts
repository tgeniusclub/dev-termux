
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';




//import * as firebase  from 'firebase';

@Injectable()
export class AuthService {

    user$:Observable<User>;
    user:User;
    

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

 
}
