import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsHomepageComponent} from "./posts-homepage/posts-homepage.component";
import {AuthGuard} from "./common/guards/auth.guard";
import {CreateAddPostComponent} from "./create-add-post/create-add-post.component";
import {AllPostsOverviewComponent} from "./all-posts-overview/all-posts-overview.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {PostDetailsResolverService} from "./post-details/services/post-details-resolver.service";

const routes: Routes = [
  {
    path: 'posts',
    component: PostsHomepageComponent ,
    canActivate: [],
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent ,
    canActivate: [AuthGuard],
    resolve: {
      post: PostDetailsResolverService
    }
  },
  {
    path: 'overview',
    component: AllPostsOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateAddPostComponent ,
    canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
