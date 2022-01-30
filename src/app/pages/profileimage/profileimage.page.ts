import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { LoadingController,ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

export interface imgFile {
  names: string;
  userPhoto: string;
  size: number;
}

@Component({
  selector: 'app-profileimage',
  templateUrl: './profileimage.page.html',
  styleUrls: ['./profileimage.page.scss'],
})
export class ProfileimagePage implements OnInit {

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

  userId:string;
  user:User;

  private filesCollection: AngularFirestoreCollection<imgFile>;
  user_name: string;
  email_display: string;
  user_id: string;
  phone: string;
  usersince: number;
  
  constructor(
    private auth:AuthService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private loadingctrl:LoadingController,
    private toastr:ToastController,
    private route:Router
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('user');
    this.files = this.filesCollection.valueChanges();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user =>{
      
      if(user){
        
        this.email_display=user.email,
        this.user_name=user.name,
        this.user_id=user.userId,
        this.phone=user.phoneNumber,
        this.usersince=user.createAt
      }
    })
  }

  async uploadImage(event: FileList) {
    const loading=await this.loadingctrl.create({
      message:'Publishing..',
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
          'userPhoto':downloadableUrl
        })
      })
    }) 
    // Show uploading progress
    
    /*
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        
        this.UploadedImageURL.subscribe(resp=>{
          
          this.storeFilesFirebase({
            names: file.name,
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
    ) 
}



storeFilesFirebase(image: imgFile) {
    
    
    
    //this.filesCollection.doc(fileId).set(image).
    this.afs.collection('user').doc(this.user_id).update(image).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });*/
} 

backbutton(){
  this.route.navigate(['/profile']);
}

async toast(message,status){
  const toast=await this.toastr.create({
    message:message,
    color:status,
    position:'top',
    duration:200
  });
  toast.present();
}
}
