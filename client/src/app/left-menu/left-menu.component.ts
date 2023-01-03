import {Component, OnInit} from '@angular/core';
import {AdvertisementEto} from "../model/advertisementEto";
import {MatDialog} from "@angular/material/dialog";
import {PostFilterPopupComponent} from "./post-filter-popup/post-filter-popup.component";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import {UpdateService} from "../common/services/updateService/update.service";
import {of, switchMap} from "rxjs";
import {RestService} from "../common/services/restService/rest.service";
import {ALL_USER_ASSIGNMENTS, ALL_USER_POSTS, POST_DETAILS, POSTS_HOMEPAGE} from "../app-routing-consts";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  userCares: AdvertisementEto[] = [];
  userCreatedAds: AdvertisementEto[] = [];
  isLoggedIn: boolean;

  constructor(private restService: RestService, private readonly router: Router, private readonly updateService: UpdateService,
              private readonly matDialog: MatDialog, private readonly authService: KeycloakService) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.updateService.getUpdateObservable().pipe(
        switchMap(() => this.restService.getLast5PostCreatedByUser()),
        switchMap((firstObservable: AdvertisementEto[]) => {
          this.userCares = firstObservable;
          return this.restService.getLast5PostsUserIsAssginedTo();
        })).subscribe(
        (second: AdvertisementEto[]) => {
          this.userCreatedAds = second;
        }
      )
    }
  }

  openFilterPopup() {
    this.matDialog.open(PostFilterPopupComponent, {
      height: '300px',
      width: '500px',
    })
  }

  navigateToAllPostsCreatedOverview() {
    this.router.navigateByUrl(ALL_USER_POSTS);
  }

  navigateToAllJobsAssignedToUser() {
    this.router.navigateByUrl(ALL_USER_ASSIGNMENTS);
  }

  isMainPostPage() {
    return this.router.url.includes(POSTS_HOMEPAGE);
  }

  getPostDetailsUrl(id: number) {
    return POST_DETAILS(id);
  }


}
