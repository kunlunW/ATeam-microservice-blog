import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class AllPostService {

//   private url = 'http://127.0.0.1:5011';
	constructor(private httpClient: HttpClient){

	}

  getAllPost(){
    return this.httpClient.get('http://127.0.0.1:5011/allposts');
  }
}
