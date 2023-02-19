import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '../app/components/main/posts/posts.component';
import { PostdetailComponent } from '../app/components/main/postdetail/postdetail.component';

const routes: Routes = [
  {
    path:'posts', component: PostsComponent
  },
  {
    path:'postdetails/:id', component: PostdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
