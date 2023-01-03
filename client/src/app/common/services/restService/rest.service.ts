import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../../../model/advertisementEto";
import {map, Observable, of} from "rxjs";
import {AdNotification} from "../../../model/adNotification";
import {FilterTo} from "../../../model/filterTo";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly POST_SERVICE_ENDPOINT = '/post-service/v1/posts';
  private readonly NOTIFICATION_SERVICE_ENDPOINT = '/notification-service/v1/notifications';
  private readonly SAVE_POST_REQUEST_HEADER = {headers: {'Content-Type': 'application/json'}}

  constructor(private readonly httpClient: HttpClient) { }

  public getAllPostsUserCreated(): Observable<AdvertisementEto[]>{
    return <Observable<AdvertisementEto[]>>this.httpClient.get(`${this.POST_SERVICE_ENDPOINT}/all-user-created`)
  }

  public getAllPostsUserIsAssignedTo(): Observable<AdvertisementEto[]>{
    return <Observable<AdvertisementEto[]>>this.httpClient.get(`${this.POST_SERVICE_ENDPOINT}/all-user-jobs`)
  }

  public savePost(post: AdvertisementEto): Observable<AdvertisementEto>{
    return <Observable<AdvertisementEto>>this.httpClient.post(`${this.POST_SERVICE_ENDPOINT}/create`, JSON.stringify(post), this.SAVE_POST_REQUEST_HEADER)
  }

  public getLast5PostCreatedByUser(): Observable<AdvertisementEto[]>{
    return <Observable<AdvertisementEto[]>>this.httpClient.get(`${this.POST_SERVICE_ENDPOINT}/last-created`)
  }

  public getLast5PostsUserIsAssginedTo(): Observable<AdvertisementEto[]>{
    return <Observable<AdvertisementEto[]>>this.httpClient.get(`${this.POST_SERVICE_ENDPOINT}/last-assigned`)
  }

  public getAllNotifications(): Observable<AdNotification[]>{
    return <Observable<AdNotification[]>>this.httpClient.get(`${this.NOTIFICATION_SERVICE_ENDPOINT}/get/all`)
  }

  public saveNotificationWithStatusChange(notification: AdNotification): Observable<AdNotification>{
    return <Observable<AdNotification>>this.httpClient.post(`${this.NOTIFICATION_SERVICE_ENDPOINT}/change`, JSON.stringify(notification), this.SAVE_POST_REQUEST_HEADER)
  }

  public getPostDetails(postId: number): Observable<AdvertisementEto>{
    return <Observable<AdvertisementEto>>this.httpClient.get(`${this.POST_SERVICE_ENDPOINT}/post/${postId}`).pipe(
      map((val: AdvertisementEto) => {
        if(val.base64image){
          val.base64image = 'data:image/png;base64,'+val.base64image
        }
        return val;
      })
    );
  }

  public postUserAssignemntCancelation(postId: number): Observable<AdvertisementEto>{
    return <Observable<AdvertisementEto>>this.httpClient.post(`${this.POST_SERVICE_ENDPOINT}/post/${postId}/cancel`, {})
  }

  public postPostArchivisation(postId: number): Observable<AdvertisementEto>{
    return <Observable<AdvertisementEto>>this.httpClient.post(`${this.POST_SERVICE_ENDPOINT}/post/${postId}/close`, {})
  }

  public postAssignementToPost(postId: number): Observable<AdvertisementEto>{
    return <Observable<AdvertisementEto>>this.httpClient.post(`${this.POST_SERVICE_ENDPOINT}/post/${postId}/assign`, {})
  }

  public getPostsForPageWithFilters(pageNumber: number, filters: FilterTo): Observable<AdvertisementEto[]>{
    return <Observable<AdvertisementEto[]>>this.httpClient.post(`${this.POST_SERVICE_ENDPOINT}/page/${pageNumber}`, JSON.stringify(filters),  this.SAVE_POST_REQUEST_HEADER)
  }

  public getUncheckedNotifications(): Observable<AdNotification[]>{
    return <Observable<AdNotification[]>> this.httpClient.get(`${this.NOTIFICATION_SERVICE_ENDPOINT}/get/uncheked`);
  }


}
