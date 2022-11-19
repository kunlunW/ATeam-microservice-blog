import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ PostService, CommonService ]
})
export class PostComponent implements OnInit {
  public posts : any[] = [];

  constructor(private post_service: PostService,
              private common_service: CommonService) {

  }

  ngOnInit(){
    this.getPosts();

    this.common_service.postAdded_Observable.subscribe((response: any) => {
      this.getPosts();
    });
  }

  getPosts(){
    this.post_service.getPosts().subscribe((response: any) => {
      console.log('result is ', response);
      this.posts = response['data'];
      this.posts = Array.of(this.posts)
    });
  }

}
