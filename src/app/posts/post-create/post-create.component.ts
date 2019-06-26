import { Component, OnInit, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }
  enteredValue='';
  newPost = 'No Content Here :( ';
  ngOnInit() {
  }


  onAddPost()
  {
     this.newPost = this.enteredValue ;
  }


}
