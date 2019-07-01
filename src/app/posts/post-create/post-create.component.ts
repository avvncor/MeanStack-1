import { Component, OnInit} from '@angular/core';
import { post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostService) { }
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

    const Post: post = { title: form.value.title, content: form.value.content} ;
    this.postService.addPost(Post);
    form.resetForm();
  }


}
