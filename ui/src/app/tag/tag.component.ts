import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TagModel } from 'ngx-chips/core/tag-model';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  name: any;
  // itemsAsObjects = [];
  public tags = [{ value: 0, name: 'Angular' }];


  constructor(private http: HttpClient) {}

  onAdding(tag: any): Observable<TagModel> {
    const confirm = window.confirm('Do you really want to add this tag?');
    this.tags.concat(tag.name);
    console.log(this.tags);
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<TagModel> {
    const confirm = window.confirm(
      'Do you really want to remove this tag?' + tag.name
    );
    return of(tag).pipe(filter(() => confirm));
  }
}