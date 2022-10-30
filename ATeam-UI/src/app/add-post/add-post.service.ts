import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class AddPostService {

	constructor(private http: HttpClient){

	}
	// obseervable --> http object: header object
	addPost(post: Post){
		return this.http.post('http://127.0.0.1:5011/api/post/createPost',{
			title : post.title,
			description : post.description
		})
	}

}