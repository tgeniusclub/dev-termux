import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase/app';
import FieldValue from 'firebase/app'
import  firestore  from 'firebase/app'
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { FormGroup, FormBuilder } from "@angular/forms";

export interface imgFile {
  Name: string;
  postPhoto: string;
  size: number;
}


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})
export class PublisherPage implements OnInit {

  form: FormGroup;
     // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;
  
    userId:string;
    user_name:string;
    toolname:string;
    tooltype:string;
    postPhoto:string;
    developername:string;
    publishername:string;
    tooldescription:string;
    contributors:string;
    disclaimer:string;
    note:string;

    
    user:User;
    
    email:string;
    phone:string;
  user_id: string;

  

  constructor(
    private auth:AuthService,
    public afs:AngularFirestore,
    private afauth:AngularFireAuth,
    private afStorage: AngularFireStorage,
    private loadingctrl:LoadingController,
    private toastr:ToastController,
    private menu:MenuController,
    private router:Router,
    public fb: FormBuilder
  ) { 
    this.isFileUploading = false;
    this.isFileUploaded = false;
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('user');
    this.files = this.filesCollection.valueChanges();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user =>{
      this.user_id = user.userId;
      this.user_name = user.name;
      this.email = user.email;
      this.phone = user.phoneNumber;
    })
    
  }
 logout(){
   this.router.navigate[('/login')]
 }
//=====================================================================

async uploadphoto(event: FileList) {
  const loading=await this.loadingctrl.create({
    //message:'uploading..',
    spinner:'crescent',
    showBackdrop:true
  });

  loading.present();

  
    const file = event.item(0)

    // Image validation
    if (file.type.split('/')[0] !== 'image') { 
      this.loadingctrl.dismiss();
      this.toast('File type is not supported','danger')
      //console.log('File type is not supported!')
      return;
    }
    
    this.isFileUploading = true;
    this.isFileUploaded = false;
    
    this.imgName = file.name;
    
    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    
    // Image reference
    var imageRef = this.afStorage.ref(fileStoragePath);
    
    
    
    
    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    
    this.loadingctrl.dismiss();
    this.percentageVal = this.fileUploadTask.percentageChanges();
    
    //this.userId=this.user.userId;
    this.fileUploadTask.then(resp =>{
      var imgFile = resp.task.snapshot.ref.getDownloadURL();
      imgFile.then(downloadableUrl =>{
    
        
        //console.log("URL", downloadableUrl);
        this.afs.collection('user').doc(this.user_id).update({
          posts: firebase.default.firestore.FieldValue.arrayUnion({
            'toolname':this.toolname,
            'publishername':this.user_name,
            //'tooltype':this.tooltype,
            
            'postPhoto':downloadableUrl,
            'developername':this.developername,
            'contributor':this.contributors,
            'tooldescription':this.tooldescription,
            'note':this.note,
            'disclaimer':this.disclaimer,
            'postAt':Date.now()
            
          })
        }).then(()=>{
          loading.dismiss();
          this.toast('published Success, ', 'success');
          this.router.navigate(['/tabs']);
        }).catch(error =>{
         loading.dismiss();
         this.toast(error.message,'danger');
       })
      })
    }).catch(error =>{
      loading.dismiss();
      this.toast(error.message,'danger');
    }) 

  



    
// Show uploading progress

/*
this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
  
  finalize(() => {
    // Retreive uploaded image storage path
    this.UploadedImageURL = imageRef.getDownloadURL();
    
    this.UploadedImageURL.subscribe(resp=>{
      
      this.storeFilesFirebase({
        Names: file.name,
        userPhoto: resp,
        size: this.imgSize
      });
      this.isFileUploading = false;
      this.isFileUploaded = true;
    },error=>{
      this.loading.dismiss()
      this.toast(error.message,'danger')
      //console.log(error);
    })
  }),
  tap(snap => {
      this.imgSize = snap.totalBytes;
  }) 
) */
}


/*
storeFilesFirebase(image: imgFile) {



//this.filesCollection.doc(fileId).set(image).
this.afs.collection('user').doc(this.user_id).update(image).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
} */


//=====================================================================

async publishtool(){

   

  // if(this.toolname && this.publishername && this.developername && this.tooldescription &&
    // this.note && this.contributors && this.disclaimer){
    const loading=await this.loadingctrl.create({
      message:'Publishing..',
      spinner:'crescent',
      showBackdrop:true
    });
 
    loading.present();
    

    
    this.afs.collection('user').doc(this.user_id).update({
      posts: firebase.default.firestore.FieldValue.arrayUnion({
        //user_name
        'toolname':this.toolname,
        'publishername':this.user_name,
        //'tooltype':this.tooltype,
        
        
        'developername':this.developername,
        'contributor':this.contributors,
        'tooldescription':this.tooldescription,
        'note':this.note,
        'disclaimer':this.disclaimer,
        'postAt':Date.now()
      })
      
   
    }).then(()=>{
     loading.dismiss();
     this.toast('published Success, ', 'success');
     this.router.navigate(['/tabs']);
   }).catch(error =>{
    loading.dismiss();
    this.toast(error.message,'danger');
  }).catch(error =>{
    loading.dismiss();
    this.toast(error.message,'danger');
  })
  // }else{
   //  this.toast('Please fill the form, All field are required','danger');
   //}
   


 } 

 async toast(message, status)
 {
   const toast=await this.toastr.create({
     message:message,
     position:'top',
     color:status,
     duration:2000
   });
   toast.present();
 }//end of toast
  
}
