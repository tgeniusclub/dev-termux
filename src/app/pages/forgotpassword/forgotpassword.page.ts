import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  
  email:string;
  ionicForm:FormGroup;

  constructor(
    public router:Router,
    private afauth:AngularFireAuth,
    private toastr:ToastController,
    private loadingctrl: LoadingController,
    public formBuilder:FormBuilder
    ) { }
  RedirectToLoginPage()
  {
    this.router.navigateByUrl('/loginscreen')
  }

  ngOnInit() {
  }

  async forgetpassword(){
    if(this.email){
      const loading= await this.loadingctrl.create({
        message:"Please wait..",
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afauth.sendPasswordResetEmail(this.email).then(()=>{
        loading.dismiss();
        this.toast('Please check your email','success');
        this.router.navigate(['/loginscreen'])
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.Message, 'danger');
        
      })
    } else{
       this.toast('enter your email adress', 'danger');
    }
  } //end of reset password

  async toast(Message,status){
    
      const toast = await this.toastr.create({
        message: Message,
        position:'top',
        color:status,
        duration: 2000
      });
      toast.present();
    
  } //end of toast

}
