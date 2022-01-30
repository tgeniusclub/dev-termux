import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
//import { data } from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  email_display:string;
  user_id:string;
  user_name:string;
  phone:string;
  usersince:number;
  user_photo: string;

  constructor(
    private auth:AuthService,
    private router:Router
  
  ) { 
    this.auth.user$.subscribe(user =>{
      //console.log('auth',user.userPhoto);
      if(user){
        
        this.email_display=user.email;
        this.user_name=user.name;
        this.user_id=user.userId;
        this.phone=user.phoneNumber;
        this.user_photo=user.userPhoto;
        this.usersince=user.createAt;
      }
    })
  }

  ngOnInit() {
    
    
  }
  editprofile(){
    this.router.navigate(['/editprofile']);
  }
  uploadpicture(){
    this.router.navigate(['/profileimage']);
  }

}
