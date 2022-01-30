import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service'
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

    email:string;
    password:string;

  constructor(
    public router1:Router, 
    public formbuilder:FormBuilder, 
    public auth: AuthService,
    public toastr:ToastController,
    public loadingctrl:LoadingController,
    public firestore:AngularFirestore
      ) { }

  RedirectToLoginPage()
  {
    this.router1.navigate(['/signup']);
  }
  RedirectToForgetPage()
  {
    this.router1.navigate(['/forgotpassword']);
  }

 

 

  
  ngOnInit() {
    
  }

  async login(){
    if(this.email && this.password){
      const loading=await this.loadingctrl.create({
        message:'Logging In...',
        spinner:'crescent',
        showBackdrop:true
      }); 
      
      loading.present();

      this.auth.login(this.email, this.password).then(()=>{
        loading.dismiss();

      
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    }else if(!this.email || this.password){
      this.loadingctrl.dismiss();
      this.toast('Check your password or email','danger');
      
    }
    else{
      this.toast('Please Enter your email & password','danger');
      
    }
    
  }//end of login

  async toast(message,status){
    const toast= await this.toastr.create({
      message: message,
      position:'top',
      color:status,
      duration:2000
    })
    toast.present();
  }
}
