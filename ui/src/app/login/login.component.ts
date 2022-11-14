import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';



//declare var UNIQUE_USER_ID : ""

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})

export class LoginComponent {

  public user : User;

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
