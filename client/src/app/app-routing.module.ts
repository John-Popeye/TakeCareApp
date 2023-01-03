import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsHomepageComponent} from "./posts-homepage/posts-homepage.component";
import {AuthGuard} from "./common/guards/auth.guard";
import {CreateAddPostComponent} from "./create-edit-post/create-add-post.component";
import {AllPostsOverviewComponent} from "./all-posts-overview/all-posts-overview.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {PostDetailsResolverService} from "./post-details/services/post-details-resolver.service";
import {NotificationsComponent} from "./notifications/notifications.component";
import {AllPostsResolverService} from "./all-posts-overview/services/all-posts-resolver.service";
import {AllUserJobsResolverService} from "./all-posts-overview/services/all-user-jobs-resolver.service";

export const routes: Routes = [
  {
    path: 'posts/:page',
    component: PostsHomepageComponent ,
    canActivate: [],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'notifications',
    component: NotificationsComponent ,
    canActivate: [AuthGuard],
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
    path: 'post/:id/edit',
    component:  CreateAddPostComponent,
    canActivate: [AuthGuard],
    resolve: {
      post: PostDetailsResolverService
    }
  },
  {
    path: 'overview/myposts',
    component: AllPostsOverviewComponent,
    canActivate: [AuthGuard],
    resolve: {
      posts: AllPostsResolverService
    }
  },
  {
    path: 'overview/myjobs',
    component: AllPostsOverviewComponent,
    canActivate: [AuthGuard],
    resolve: {
      posts: AllUserJobsResolverService
    }
  },
  {
    path: 'create',
    component: CreateAddPostComponent ,
    canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'posts/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
