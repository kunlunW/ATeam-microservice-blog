import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddPostComponent } from "./add-post.component"
import { AddPostRoutingModule } from "./add-post-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddPostComponent],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AddPostModule { }
