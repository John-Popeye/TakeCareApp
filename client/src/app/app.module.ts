import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import {initializeKeycloak} from "./common/keycloakInit/initializeKeycloak";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorCatchingInterceptor} from "./common/interceptors/error-catch.interceptor.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MaterialComponentsModule} from "./common/material-components/material-components.module";
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import {LoadingInterceptor} from "./common/interceptors/loading-interceptor.component";
import {LoadingService} from "./common/services/loading.service";
import { PostsHomepageComponent } from './posts-homepage/posts-homepage.component';
import { CreateAddPostComponent } from './create-add-post/create-add-post.component';
import {MatNativeDateModule} from "@angular/material/core";
import {NgxFileDropModule} from "ngx-file-drop";
import { PostFilterPopupComponent } from './left-menu/post-filter-popup/post-filter-popup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AllPostsOverviewComponent } from './all-posts-overview/all-posts-overview.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TopToolbarComponent,
    LeftMenuComponent,
    PostsHomepageComponent,
    CreateAddPostComponent,
    PostFilterPopupComponent,
    AllPostsOverviewComponent,
    PostDetailsComponent,

  ],
  imports: [
    ReactiveFormsModule,
    NgxFileDropModule,
    MaterialComponentsModule,
    BrowserModule,
    MatNativeDateModule,
    RouterModule,
    KeycloakAngularModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  },
    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
