import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http' ;
import { post } from '../posts.model';
import { PostService } from '../post.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(public postService: PostService, public http: HttpClient) { }

 posts: post[]  = [];

  ngOnInit() {
    // this.posts =this.postService.getPosts();
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((data) => {
      return data.posts.map(mappedPost => {
        return {
          title: mappedPost.title,
          content: mappedPost.content,
          id: mappedPost
       };
      });
    }))
    .subscribe((postData) => {

        this.posts = postData;
     });

    console.log(this.posts);
  }

}
