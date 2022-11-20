import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AllPostComponent } from "./all-post.component"
import { AllPostRoutingModule } from "./all-post-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AllPostComponent],
  imports: [
    CommonModule,
    AllPostRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AllPostModule { }