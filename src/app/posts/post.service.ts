import { post } from './posts.model';
import { postSchema} from '../../../backEnd/models/posts';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http' ;
import { map } from 'rxjs/operators';




@Injectable({providedIn: 'root'})
export class PostService {
 private posts: post[] = [];

  private http: HttpClient;
  postUpdated = new Subject<post[]>();

  constructor(http: HttpClient) {
    this.http = http;
  }



   getPosts() {
  this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
  .pipe(map((data) => {
    return data.posts.map((mappedPost) => {
      return {
        title: mappedPost.title,
        content: mappedPost.content,
        id: mappedPost._id
     };
    });
  }))
  .subscribe((postData) => {
      this.posts = postData;
      this.postUpdated.next([...this.posts]);
   });
//  return [...this.posts];
   }

   postUpdatedListner() {
     return this.postUpdated.asObservable();
   }

  addPost(data: post) {
    const posting = data;
    this.posts.push( data );
    this.http.post<{message: string}>('http://localhost:3000/api/posts', posting).subscribe((dataPosted) => {
    console.log(dataPosted.message);
    this.postUpdated.next([...this.posts]);
   });
  }

onDelete(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      console.log('deleted with id ' + id);
      const updatedPosted =  this.posts.filter( postm => postm.id !== id );
      this.posts = updatedPosted;

      this.postUpdated.next([...this.posts]);
    });
  }


}
