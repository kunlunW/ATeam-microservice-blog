import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray,FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  p: number = 1;
  searchUserForm: FormGroup;

  constructor(private service:UsersService,
              private formsModule: FormsModule,
              private router: Router) {

    this.searchUserForm = new FormGroup({
      id: new FormControl('', { validators: [Validators.required] }),
      lname: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] })
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let id = this.searchUserForm.controls['id'].value;
    let lname = this.searchUserForm.controls['lname'].value;
    let email = this.searchUserForm.controls['email'].value;
    let url = this.router.url

    // get user by id
    if (url.includes('users/')) {
      this.service.getUserById(url.split('users/')[1]).subscribe((response: any) => {
        this.users = [response];
      });
    }
    else if (url.includes('users?')) {
      // get user by last name and email
      if (url.includes('lname') && url.includes('email')) {
        this.service.getUserByLastNameAndEmail(url.split('?')[1]).subscribe((response: any) => {
          this.users = response;
        });
      }
      // get user by last name
      else if (url.includes('lname')) {
        this.service.getUserByLastName(url.split('lname=')[1]).subscribe((response: any) => {
          this.users = response;
        });
      }
      // get user by email
      else if (url.includes('email')) {
        this.service.getUserByEmail(url.split('email=')[1]).subscribe((response: any) => {
          this.users = response;
        });
      }
    }
    // get all users
    else if (url.includes('users')) {
      this.service.getAllUsers().subscribe((response: any) => {
        this.users = response;
      });
    }
  }

  // search users w/ given information
  searchUser() {
    let id = this.searchUserForm.controls['id'].value;
    var lname = this.searchUserForm.controls['lname'].value;
    var email = this.searchUserForm.controls['email'].value;

    // search by id
    if (id && !isNaN(id)) {
      window.location.href = "/users/" + id;
    } else {
      // search by last name and email
      if (lname && email) {
        window.location.href = "/users?lname=" + lname + "&email=" + email;
      }
      //search by last name only
      else if (lname) {
        window.location.href = "/users?lname=" + lname;
      }
      //search by email only
      else if (email) {
        window.location.href = "/users?email=" + email;
      }
    }
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getUsers();
  }
}
