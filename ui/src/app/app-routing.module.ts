import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: "", loadChildren: () => import("./main/main.module").then(module => module.MainModule)},
  {path: "login", loadChildren: () => import("./login/login.module").then(module => module.LoginModule)},
  {path: "users", loadChildren: () => import("./user/user.module").then(module => module.UserModule)},
  {path: "users/:id", loadChildren: () => import("./user/user.module").then(module => module.UserModule)},
  {path: ":owner_id/posts", loadChildren: () => import("./post/post.module").then(module => module.PostModule)},
  {path: "createPost", loadChildren: () => import("./add-post/add-post.module").then(module => module.AddPostModule)},
  {path: "allposts", loadChildren: () => import("./all-post/all-post.module").then(module => module.AllPostModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

