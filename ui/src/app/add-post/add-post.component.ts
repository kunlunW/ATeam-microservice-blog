import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { Observable, of } from 'rxjs';
import { TagModel } from 'ngx-chips/core/tag-model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService, CommonService ]
})
export class AddPostComponent {
  tags = '';

  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLInputElement> = {} as ElementRef;
  public post : Post;

  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
    this.post = new Post();
  }

  onAdding(tag: any): Observable<TagModel> {
    this.tags += tag.name;
    this.tags += " ";
    return of(tag).pipe();
  }

  onRemoving(tag: any): Observable<TagModel> {
    return of(tag).pipe();
  }

  addPost() {
    this.post.tag = this.tags;
    console.log(this.post);
    if(this.post.title && this.post.description){
      this.addPostService.addPost(this.post).subscribe({
        next: (response: any) => {
          this.commonService.notifyPostAddition();
          console.log(response)
          var owner_id = '7d529dd4-548b-4258-aa8e-23e34dc8d43d'
          this.router.navigate(['/'+owner_id+'/posts']);
        },
        error: (error: any) => {
          alert('Failed to Post New Blog')
        }
      });
    } else {
      alert('Title and Description required');
    }
  }
}
