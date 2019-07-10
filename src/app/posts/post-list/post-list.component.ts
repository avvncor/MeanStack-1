import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient} from '@angular/common/http' ;
import { post } from '../posts.model';
import { PostService } from '../post.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostService, public http: HttpClient) { }

 posts: post[]  = [];
 private postSub: Subscription;

  ngOnInit() {
     this.postService.getPosts();
     this.postSub = this.postService. postUpdatedListner().subscribe((Post: post[]) => {
       this.posts = Post;
     });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  delete(id: string){
   // console.log('working at post component id= ' + id);
      this.postService.onDelete(id);
  }
}
