import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class ShowPostService {

	constructor(private http: HttpClient){

	}
	
	getAllPost(){
		return this.http.post('http://127.0.0.1:5011/api/post/getAllPost',{})
	}

}