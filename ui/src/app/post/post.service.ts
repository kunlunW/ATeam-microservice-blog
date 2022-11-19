import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class PostService {

	constructor(private http: HttpClient){

	}

  getPosts(){
    return this.http.post('http://127.0.0.1:5011/posts',{})
  }
}
