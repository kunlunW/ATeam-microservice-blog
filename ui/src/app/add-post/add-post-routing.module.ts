import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from "@angular/router";
import { AddPostComponent } from "./add-post.component";

const routes: Routes = [
  { path: '', component: AddPostComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPostRoutingModule { }
