import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name:string;
  phone:string;
  email:string;
  password:string;
  confpassword:string;
  passwordMatch:Boolean;

  constructor(
    public router:Router,
    public afs:AngularFirestore,
    public afauth:AngularFireAuth,
    public loadingctrl:LoadingController,
    private toastr:ToastController,

    ) { }

  RedirectToLoginscreenPage()
  {
    this.router.navigateByUrl('/loginscreen')
  }

  ngOnInit() {
  }

  async SignUp()
  {
    if(this.name && this.phone && this.email && this.password)
    {
      const loading=await this.loadingctrl.create({
        message:'loading...',
        spinner:'crescent',
        showBackdrop:true
      });

      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email,this.password).then((data)=>{
        
        this.afs.collection('user').doc(data.user.uid).set({
          'userId':data.user.uid,
          'name':this.name,
          'phoneNumber':this.phone,
          'email':this.email,
          'password':this.password,
          'createAt':Date.now()
        });

        data.user.sendEmailVerification();
      })
      .then(()=>{
        loading.dismiss();
        this.toast('Registration Success, Please check your email', 'success');
        this.router.navigate(['/loginscreen']);
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
      
    }else{
      this.toast('please fill the form, All form are required', 'danger');
    }
  }//end of signup

  checkPassword(){
    if(this.password == this.confpassword){
      this.passwordMatch=true;
    }else{
      this.passwordMatch=false;
    }
  }
  async toast(message,status)
    {
     const toast= await this.toastr.create({
       message:message,
       position:'top',
       color:status,
       duration:2000
     });
     toast.present();
    }//end of toast
}
