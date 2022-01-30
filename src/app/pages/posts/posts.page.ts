import { Component, OnInit } from '@angular/core';

import { WpIonicService } from 'src/app/shared/wp-ionic.service';
import { LoadingController } from '@ionic/angular';
 
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
 
  Posts = [];
  postCount = null;
  page = 1;
 
  constructor(
    private wpService: WpIonicService, 
    private loadingController: LoadingController
  ) { }
 
  ngOnInit() {
    this.initPosts();
  }
 
  async initPosts() {
    let loading = await this.loadingController.create({
      message: 'Loading ...'
    });
 
    await loading.present();
 
    this.wpService.getAllPosts().subscribe((data) => {
      this.postCount = this.wpService.allPosts;
      this.Posts = data;
      loading.dismiss();
    });
  }
 
  infiniteLoad(e) {
    this.page++;
 
    this.wpService.getAllPosts(this.page).subscribe((data) => {
      this.Posts = [...this.Posts, ...data];
      e.target.complete();
 
      // Disable loading when reached last
      if (this.page == this.wpService.pages) {
        e.target.disabled = true;
      }
    });
  }
 
}