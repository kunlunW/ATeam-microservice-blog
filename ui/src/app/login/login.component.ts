import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as myGlobals from 'globals'; 


//declare var UNIQUE_USER_ID : ""

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})

export class LoginComponent {

  public user : User;

<<<<<<< HEAD:ui/src/app/login/login.component.ts
  constructor(private service: LoginService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {
    if(this.user.username && this.user.password) {
      // TODO: fix deprecated subscribe
      this.service.validateLogin(this.user).subscribe((response: any) => {
        console.log('result is ', response);
        if(response['status'] === 'success') {
          this.router.navigate(['/']);
=======
  // create a glocal variable for unique user id 
  

  constructor(private loginService: LoginService, private router: Router) {
  	this.user = new User();
  }

  validateLogin() {
  	if(this.user.username && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          myGlobals.UNIQUE_USER_ID = result['unique_user_id']
          console.log("user id is: ", myGlobals.UNIQUE_USER_ID)
          this.router.navigate(['/home']);
>>>>>>> e84c96e4e4dea960df5d0fb19b979ab8a5ecbd01:ATeam-UI/src/app/login/login.component.ts
        } else {
          alert('Wrong username password');
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('enter user name and password');
    }
  }

}
