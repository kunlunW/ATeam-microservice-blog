import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TagComponent } from "./tag.component"
import { TagRoutingModule } from "./tag-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TagRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class TagModule { }
