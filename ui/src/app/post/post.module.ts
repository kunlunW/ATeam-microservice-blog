import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostComponent } from "./post.component"
import { PostRoutingModule } from "./post-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class PostModule { }
