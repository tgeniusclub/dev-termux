import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpIonicService } from './../../shared/wp-ionic.service';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.page.html',
  styleUrls: ['./blog-post-details.page.scss'],
})
export class BlogPostDetailsPage implements OnInit {

  postDetial: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private wpService: WpIonicService, 
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.wpService.postDetails(id).subscribe((data) => {
      this.postDetial = data;
    });
  }

  goToOrgPost() {
    window.open(this.postDetial.link, '_blank');
  }  

}
