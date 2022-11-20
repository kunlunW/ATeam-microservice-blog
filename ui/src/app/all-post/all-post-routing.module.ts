import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from "@angular/router";
import { AllPostComponent } from "./all-post.component";

const routes: Routes = [
  { path: '', component: AllPostComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPostRoutingModule { }
