import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdvertisementEto} from "../model/advertisementEto";
import {KeycloakService} from "keycloak-angular";
import {AdvertisementStatusEnum} from "../model/enums/advertisementStatusEnum";
import {UpdateService} from "../common/services/updateService/update.service";
import {ToastrService} from "ngx-toastr";
import {RestService} from "../common/services/restService/rest.service";
import {POST_EDITION} from "../app-routing-consts";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{

  post: AdvertisementEto;
  userName: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly restService: RestService,
              private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly authService: KeycloakService, private readonly updateService: UpdateService) {
    this.authService.isLoggedIn().then(result => {
      if(result) {
        this.userName = this.authService.getUsername()
      }
    }).catch(()=>{})
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any ) => {
      this.post = data.post;
    })
  }

  canEdit(){
    return this.userName === this.post.creatorUserName && this.post.status === AdvertisementStatusEnum.OPEN;
  }

  assignmentEnabled(){
    return !this.canEdit() && this.post.status === AdvertisementStatusEnum.OPEN && !this.post.takerUserName;
  }

  isUserAssignedToPost(){
    return this.userName === this.post.takerUserName && this.post.status === AdvertisementStatusEnum.ASSIGNED;
  }

  assignUserToPost(){
    this.restService.postAssignementToPost(this.post.id).subscribe(
      (val: AdvertisementEto) => {
        this.updateData(val);
        this.toastrService.info("Assignment succesfull")
        this.updateService.emitUpdate();
      }
    );
  }

  cancelAssignmentToPost(){
    this.restService.postUserAssignemntCancelation(this.post.id).subscribe(
      (val: AdvertisementEto) => {
        this.updateData(val);
        this.toastrService.info("Cancelation succesfull")
        this.updateService.emitUpdate();
      }
    );
  }

  navigateToPostEdition(){
    this.router.navigateByUrl(POST_EDITION(this.post.id))
  }

  updateData(post: AdvertisementEto){
    this.post = post;
    if(post.base64image){
      post.base64image = 'data:image/png;base64,'+post.base64image
    }
  }

  archivePost(){
    this.restService.postPostArchivisation(this.post.id).subscribe(
      (val: AdvertisementEto) => {
        this.updateData(val);
        this.toastrService.info("Cancelation succesfull")
        this.updateService.emitUpdate();
      }
    );
  }

  canPostBeArchived(){
    return this.post.creatorUserName === this.userName &&
      this.post.takerUserName !== null &&
      this.post.status !== AdvertisementStatusEnum.CLOSED;
  }

}
