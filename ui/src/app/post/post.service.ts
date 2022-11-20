import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class PostService {

  private url = 'http://127.0.0.1:5011';
	constructor(private HttpClient: HttpClient){

	}

  getPost(owner_id:string){
    return this.HttpClient.get(this.url + '/' + owner_id + '/posts');
  }
}

// @Injectable()
// export class CommentsService {

//   private options = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//     }),
//     body: {
//       id: 1,
//     },
//   };

//   deleteByID(id: any, blog_id: string) {
//     return this.http.delete(this.url + '/' + blog_id, 
//     {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//       body: {
//         "id": id,
//       },
//     })
//   }

// }

