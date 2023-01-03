
import { RestService } from './rest.service';
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../../../model/advertisementEto";
import {AdNotification} from "../../../model/adNotification";
import {of} from "rxjs";
import {tick} from "@angular/core/testing";
import {FilterTo} from "../../../model/filterTo";

describe('RestService', () => {
  let service: RestService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {
      get: jasmine.createSpy("get"),
      post: jasmine.createSpy("post")
    } as any as HttpClient;

    service = new RestService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all posts user created', () => {
    service.getAllPostsUserCreated();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/post-service/v1/posts/all-user-created');
  });

  it('should get all posts user is assigned to', () => {
    service.getAllPostsUserIsAssignedTo();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/post-service/v1/posts/all-user-jobs');
  });

  it('should save post', () => {
    let post = new AdvertisementEto();
    service.savePost(post);
    expect(httpClient.post).toHaveBeenCalledOnceWith('/post-service/v1/posts/create', JSON.stringify(post), {headers:{'Content-Type': 'application/json'}});
  });

  it('should get last 5 post created by user', () => {
    service.getLast5PostCreatedByUser();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/post-service/v1/posts/last-created');
  });

  it('should get 5 last posts user is assigned to', () => {
    service.getLast5PostsUserIsAssginedTo();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/post-service/v1/posts/last-assigned');
  });

  it('should get all notifications ', () => {
    service.getAllNotifications();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/notification-service/v1/notifications/get/all');
  });

  it('should save notification with status change', () => {
    let notification: AdNotification = new AdNotification();
    service.saveNotificationWithStatusChange(notification);
    expect(httpClient.post).toHaveBeenCalledOnceWith('/notification-service/v1/notifications/change', JSON.stringify(notification), {headers:{'Content-Type': 'application/json'}});
  });

  it('should get post details', () => {
    const post = new AdvertisementEto();
    post.base64image = 'test'

    httpClient.get = jasmine.createSpy().and.returnValue(of(post));
    const postId = 12;
    service.getPostDetails(postId).subscribe(val => {
      expect(val.base64image).toEqual('data:image/png;base64,test')
    })
    expect(httpClient.get).toHaveBeenCalledOnceWith('/post-service/v1/posts/post/12');
  });

  it('should post post cancelation', () => {
    service.postUserAssignemntCancelation(12);
    expect(httpClient.post).toHaveBeenCalledOnceWith('/post-service/v1/posts/post/12/cancel', {});
  });

  it('should post post archivisation', () => {
    service.postPostArchivisation(12);
    expect(httpClient.post).toHaveBeenCalledOnceWith('/post-service/v1/posts/post/12/close', {});
  });

  it('should post post assignemnt', () => {
    service.postAssignementToPost(12);
    expect(httpClient.post).toHaveBeenCalledOnceWith('/post-service/v1/posts/post/12/assign', {});
  });

  it('should get all unchecked notifications ', () => {
    service.getUncheckedNotifications();
    expect(httpClient.get).toHaveBeenCalledOnceWith('/notification-service/v1/notifications/get/uncheked');
  });

  it('should get posts page with filter object', ()=> {
    service.getPostsForPageWithFilters(1, new FilterTo());
    expect(httpClient.post).toHaveBeenCalledOnceWith('/post-service/v1/posts/page/1', JSON.stringify(new FilterTo()), {headers:{'Content-Type': 'application/json'}})
  })


});
