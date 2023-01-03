import {Injectable} from '@angular/core';
import {AdvertisementEto} from "../../model/advertisementEto";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {RestService} from "../../common/services/restService/rest.service";

@Injectable({
  providedIn: 'root'
})
export class AllPostsResolverService implements Resolve<AdvertisementEto[]> {

  constructor(private readonly restService: RestService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdvertisementEto[]> {
    return this.restService.getAllPostsUserCreated();
  }
}
