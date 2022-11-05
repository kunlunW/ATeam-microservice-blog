import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import {LoginComponent} from '../login/login.component';
import * as myGlobals from 'globals'; 


@Injectable()
export class AddPostService {

	public loginComponent : LoginComponent;

	constructor(private http: HttpClient){
	
	}
	// observable --> http object: header object
	addPost(post: Post){
		return this.http.post('http://127.0.0.1:5011/api/post/createPost',{
			title : post.title,
			description : post.description,
			unique_user_id: post.unique_user_id
		})
	}

}