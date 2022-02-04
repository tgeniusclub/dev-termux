import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-termux',
  templateUrl: './termux.page.html',
  styleUrls: ['./termux.page.scss'],
})
export class TermuxPage implements OnInit {

  constructor(
    public router:Router,
    private auth:AuthService,
    ) { }

  ngOnInit() {
  }
  essaie(){
   this.router.navigate(['/publisher']) 
  }
  
}
