import { post } from './posts.model';
import { postSchema} from '../../../backEnd/models/posts';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http' ;


@Injectable({providedIn: 'root'})
export class PostService {
 private posts: post[] = [];

  private http: HttpClient;

  constructor(http: HttpClient){
    this.http = http;
  }



  getPosts() {
    this.http.get<{message: string, posts: post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{

        this.posts = postData.posts;
    })
    return this.posts;
  }



  addPost(data: post) {
    const posting = data;
   // this.posts.push( data );
    this.http.post<{message: string, Post: postSchema}>('http://localhost:3000/api/posts', posting).subscribe((dataPosted) => {
     console.log(dataPosted.message + ' ' + dataPosted.Post);
   });
  }


}
