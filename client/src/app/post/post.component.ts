import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  public username: string = 'empty';
  constructor(private httpClient: HttpClient, private keyloakService: KeycloakService) {
  }

  callEndpoint(){
    this.httpClient.get('/post-service/v1/posts/all').subscribe(val => console.log(val))
  }

  ngOnInit() {
    this.keyloakService
      .isLoggedIn()
      .then( loggedIn => {
        if( loggedIn ) {
          console.log(this.keyloakService.getUsername());
          this.username = this.keyloakService.getUsername();
        }
      })
      .catch( reason => console.log ( reason ));
  }

}
