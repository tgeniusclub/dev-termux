import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User,Message } from 'src/app/models/user';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  messages:Observable<Message[]>;
  newMsg:'';
  constructor(
    public router:Router,
    private auth:AuthService,
    private afs:AngularFirestore 
  ) { }

  ngOnInit() {
    this.messages=this.auth.getChatMessages();
  }
  sendMessages(){
    this.auth.addChatMessage(this.newMsg).then(()=>{
      this.newMsg ='';
      this.content.scrollToBottom();
    })
  }
}
