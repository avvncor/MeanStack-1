import { post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostService {
 private posts: post[] = [];

  getPosts() {
    return this.posts;
  }


  addPost(data: post) {
    this.posts.push( data );
  }


}
