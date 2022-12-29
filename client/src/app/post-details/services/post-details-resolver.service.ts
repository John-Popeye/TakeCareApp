import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AdvertisementEto} from "../../model/advertisementEto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostDetailsResolverService implements Resolve<AdvertisementEto>{

  constructor(private readonly httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdvertisementEto> {
    return <Observable<AdvertisementEto>>this.httpClient.get(`/post-service/v1/posts/post/${route.paramMap.get('id')}`);
  }
}
