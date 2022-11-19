import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from "./login.component"
import { LoginRoutingModule } from "./login-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class LoginModule { }
