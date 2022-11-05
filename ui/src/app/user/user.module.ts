import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserComponent } from "./user.component"
import { UserRoutingModule } from "./user-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class UserModule { }

const httpClient = new HttpClient(new HttpXhrBackend({
  build: () => new XMLHttpRequest()
}));

