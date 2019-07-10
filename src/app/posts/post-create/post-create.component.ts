import { Component, OnInit} from '@angular/core';
import { post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { HttpClient} from '@angular/common/http' ;
import { postSchema} from '../../../../backEnd/models/posts';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostService, public http: HttpClient) { }
  title = '';
  content = '';

  ngOnInit() {
  }

  onAddPost(form: NgForm)
 {
    if(form.invalid)
   {
      return;
   }

    const Post: post = {id: null, title: form.value.title, content: form.value.content} ;
    this.postService.addPost(Post);
    form.resetForm();
  }


}
