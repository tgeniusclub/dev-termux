import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termux',
  templateUrl: './termux.page.html',
  styleUrls: ['./termux.page.scss'],
})
export class TermuxPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  essaie(){
   this.router.navigate(['/publisher']) 
  }
}
