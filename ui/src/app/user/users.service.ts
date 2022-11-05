import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://127.0.0.1:5011/users';     // localhost
  // private url = 'http://44.200.239.106:5011/users';   // aws

  constructor(private httpClient: HttpClient) { }

  // get all users
  getAllUsers(){
    return this.httpClient.get(this.url);
  }

  // get user by id
  getUserById(id: string) {
    return this.httpClient.get(this.url + "/" + id);
  }

  // get user by last name and email
  getUserByLastNameAndEmail(lname_and_email: string) {
    return this.httpClient.get(this.url + "?" + lname_and_email);
  }

  // get user by last name
  getUserByLastName(lname: string) {
    return this.httpClient.get(this.url + "?" + "lname=" + lname);
  }

  // get user by email
  getUserByEmail(email: string) {
    return this.httpClient.get(this.url + "?" + "email=" + email);
  }
}
