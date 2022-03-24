import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-termux',
  templateUrl: './termux.page.html',
  styleUrls: ['./termux.page.scss'],
})
export class TermuxPage implements OnInit {

  user_id:string;
  userpost;
  
  constructor(
    public router:Router,
    private auth:AuthService,
    private afs:AngularFirestore
    //private afc:AngularFirestoreCollection,
    ) { 
     
    }

  ngOnInit() {
    
    this.auth.getPost();
    
    
    
   
  }
  essaie(){
   this.router.navigate(['/publisher']) 
  }
 
}
