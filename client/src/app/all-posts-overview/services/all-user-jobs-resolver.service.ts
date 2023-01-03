import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AdvertisementEto} from "../../model/advertisementEto";
import {Observable} from "rxjs";
import {RestService} from "../../common/services/restService/rest.service";

@Injectable({
  providedIn: 'root'
})
export class AllUserJobsResolverService implements Resolve<AdvertisementEto[]>{

  constructor(private readonly restService: RestService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdvertisementEto[]> {
    return this.restService.getAllPostsUserIsAssignedTo();
  }
}
