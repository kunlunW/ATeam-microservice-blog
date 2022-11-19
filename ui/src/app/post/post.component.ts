import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ PostService, CommonService ]
})
export class PostComponent implements OnInit {
  public posts : any = [];


  constructor(
    private post_service: PostService,
    private common_service: CommonService,
    private router: Router) {

  }

  ngOnInit(){
    // this.getPosts();

    // this.common_service.postAdded_Observable.subscribe((response: any) => {
    this.getPosts();
    // });
  }

  getPosts(){
    let url = this.router.url;

    if (url.includes('/posts')){
      this.posts.owner_id = url.split("/")[1];
      // console.log("Hello")
      // console.log(this.posts.owner_id)
      this.post_service.getPost(this.posts.owner_id).subscribe((result:any) => {
        this.posts = result;
        console.log('result is', result);
      }) 
    }else{
      alert('wrong url')
    };

  };
    // this.post_service.getPosts().subscribe((response: any) => {
    //   console.log('result is ', response);
    //   this.posts = response['data'];
    //   this.posts = Array.of(this.posts)
    // });

  // getComments() {
  //   let url = this.router.url;

  //   if (url.includes('posts/')) {
  //     this.comments.blog_id = url.split("/")[2];
  //     this.commentsService.getCommentsByBlogID(this.comments.blog_id).subscribe((result: any) => {
  //       this.comments = result;
  //       console.log('result is ', result);
  //   })
  //     } else {
  //       alert('wrong url')
  //     };

  // };

}

