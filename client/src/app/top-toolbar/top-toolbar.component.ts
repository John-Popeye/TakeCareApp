import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private readonly router: Router, private readonly authService: KeycloakService) {
    this.authService.isLoggedIn().then(result => {
      this.isLoggedIn = result
      if(result) {
        this.userName = this.authService.getUsername()
      }
    })
  }

  navigateToCreatePost(){
    this.router.navigateByUrl('/create')
  }

  navigateToHomePage(){
    this.router.navigateByUrl('/posts')
  }

  navigateToAccountSettings(){
    this.authService.getKeycloakInstance().accountManagement();
  }
}
