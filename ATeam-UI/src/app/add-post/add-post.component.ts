import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post : Post;

  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
  	this.post = new Post();
  }

  addPost() {
  	if(this.post.title && this.post.description){
  		this.addPostService.addPost(this.post).subscribe(res =>{
  			this.closeBtn.nativeElement.click();
        this.commonService.notifyPostAddition();
        console.log('result is ', res);
        if(res['status'] === 'success') {
          this.router.navigate(['/home']);
        } else {
          if(res['message'] === 'Log in required'){
            alert('Please Log In before Posting');
          }else{
            alert('Posting failed, please try again');
          } 
        }
  		}, error => {
        console.log('error is ', error);
      });
  	} else {
  		alert('Title and Content required');
  	}
  }

}
