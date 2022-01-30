import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
//import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    //public network: Network,
    public router:Router
    )
  {

   }
   RedirectToOtherPage(){
     this.router.navigateByUrl('/loginscreen')
   }
   RedirectToSignUpPage()
   {
     this.router.navigateByUrl('/signup')
   }
   RedirectToTabs()
   {
     this.router.navigateByUrl('/tabs')
   }

  ngOnInit() {
   
  }

}
