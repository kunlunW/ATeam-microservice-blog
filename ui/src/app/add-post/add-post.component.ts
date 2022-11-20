import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { TagModel } from 'ngx-chips/core/tag-model';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService, CommonService ]
})
export class AddPostComponent {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  name: any;
  itemsAsObjects = [
    { value: 0, name: 'Angular' },
    { value: 1, name: 'React' },
  ];

  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLInputElement> = {} as ElementRef;
  public post : Post;

  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
    this.post = new Post();
  }

  

  addPost() {
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
