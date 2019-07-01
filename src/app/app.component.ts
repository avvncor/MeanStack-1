import { Component } from '@angular/core';
import { post } from './posts/posts.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean';

  postAdded: post[] = [];

  createPost(ppost: post ) {
      this.postAdded.push(ppost);
  }

}
