import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

    
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

  logout(){
    this.auth.logout();
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }
}
