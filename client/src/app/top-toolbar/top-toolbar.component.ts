import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import { timer} from "rxjs";
import {AdNotification} from "../model/adNotification";
import _ from "lodash";
import {ToastrService} from "ngx-toastr";
import {RestService} from "../common/services/restService/rest.service";
import {NOTIFICATIONS, POST_CREATION, POSTS_HOMEPAGE} from "../app-routing-consts";

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit{

  isLoggedIn: boolean = false;
  userName: string = '';
  notifications: AdNotification[] = [];

  constructor(private readonly router: Router, private readonly toastrService: ToastrService,
              private readonly authService: KeycloakService, private readonly restService: RestService) {
  }

  public async ngOnInit(){
    this.isLoggedIn = await this.authService.isLoggedIn();

    if(this.isLoggedIn){
      this.userName = await this.authService.getUsername();
    }

    this.getSubscribeToGetNotifications();
  }

  navigateToCreatePost(){
    this.router.navigateByUrl(POST_CREATION)
  }

  navigateToHomePage(){
    this.router.navigateByUrl(POSTS_HOMEPAGE)
  }

  navigateToAccountSettings(){
    this.authService.getKeycloakInstance().accountManagement();
  }

  getSubscribeToGetNotifications(){
    if(this.isLoggedIn) {
      timer(0, 7000).subscribe(() =>
        this.restService.getUncheckedNotifications().subscribe((val: AdNotification[]) => {
          if (!_.isEmpty(_.xor(val.map(not => not.id), this.notifications.map(not => not.id))) && this.notifications.length < val.length) {
            this.toastrService.show("You have new notification(s)")
          }
          this.notifications = val;
        })
      )
    }
  }

  navigateToNotifications(){
    this.router.navigateByUrl(NOTIFICATIONS)
  }
}
