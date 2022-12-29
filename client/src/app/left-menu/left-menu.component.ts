import { Component, OnInit } from '@angular/core';
import {AdvertisementEto} from "../model/advertisementEto";
import {MatDialog} from "@angular/material/dialog";
import {PostFilterPopupComponent} from "./post-filter-popup/post-filter-popup.component";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit{
  public panelOpenState = true;
  userCares: AdvertisementEto[] = [];
  userCreatedAds: AdvertisementEto[] = [];
  isLoggedIn: boolean;

  constructor(private httpService: HttpClient, private readonly router: Router,
              private readonly matDialog: MatDialog, private readonly authService: KeycloakService) {
    this.authService.isLoggedIn().then(result => {
      this.isLoggedIn = result
    })
  }

  ngOnInit(): void {
      this.httpService.get('/post-service/v1/posts/last-created').subscribe((posts: AdvertisementEto[]) => this.userCares = posts)
      this.httpService.get('/post-service/v1/posts/last-assigned').subscribe((posts: AdvertisementEto[]) => this.userCreatedAds = posts)

  }

  openFilterPopup(){
    this.matDialog.open(PostFilterPopupComponent, {
      height: '450px',
      width: '500px',
    })
  }

  navigateToAllPostsCreatedOverview(){
    this.router.navigateByUrl('/overview');
  }

  isMainPostPage(){
    return this.router.url.includes('/posts');
  }




}
