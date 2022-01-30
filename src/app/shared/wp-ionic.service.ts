import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WpIonicService {

  endpoint = `https://tgeniusclub.com/wp-json/wp/v2/`;
  allPosts = null;
  pages: any;
 
  constructor( private httpClient: HttpClient ) { }
 
  getAllPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '6',
        page: ''+page
      }
    };
 
    return this.httpClient.get<any[]>(`${this.endpoint}posts?_embed`, options)
    .pipe(
      map(res => {
        this.pages = res['headers'].get('x-wp-totalpages');
        this.allPosts = res['headers'].get('x-wp-total');
        return res['body'];
      })
    )
  }
 
  postDetails(id) {
    return this.httpClient.get(`${this.endpoint}posts/${id}?_embed`)
    .pipe(
      map((post) => {
        return post;
      })
    )
  }

}