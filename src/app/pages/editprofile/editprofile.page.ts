import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  userId:string;
  name:string;
  email:string;
  phone:string;
  user:User;
  user_photo: string;

  constructor(
    private auth:AuthService,
    private afs:AngularFirestore,
    private loadingctrl:LoadingController,
    private toastr:ToastController,
    private router:Router
    
    ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user =>{
      this.userId = user.userId;
      this.name = user.name;
      this.email = user.email;
      this.phone = user.phoneNumber;
      this.user_photo=user.userPhoto;
    })
  }

  async updateProfile(){
    const loading= await this.loadingctrl.create({
      message:'updating..',
      spinner:'crescent',
      showBackdrop:true
    });
    loading.present();

    
    this.afs.collection('user').doc(this.userId).set({
      'name':this.name,
      'email':this.email,
      'phoneNumber':this.phone,
      'editAt':Date.now()
  
    },{merge:true})
    .then(()=> {
      loading.dismiss();
      this.toast('update success','success');
      this.router.navigate(['/profile']);
    })
    .catch(error =>{
      loading.dismiss();
      this.toast(error.message,'danger');
    })
 
  }

    async toast(message,status){
      const toast=await this.toastr.create({
        message:message,
        color:status,
        position:'top',
        duration:200
      });
      toast.present();
    }
}
