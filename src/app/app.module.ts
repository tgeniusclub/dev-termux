import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//forms
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

//angular
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';

//environment
import {environment} from 'src/environments/environment.prod';

//servvices
import { AuthService } from './services/auth.service';

//guards
import { AuthGuard } from './guards/auth.guard'; 

//httpsclient
import { HttpClientModule } from '@angular/common/http';

//ionicstoragemodule

import { File } from '@ionic-native/file/ngx';

import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
    
  
    
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
    File,
    FilePath ],
  bootstrap: [AppComponent],


})
export class AppModule {}
