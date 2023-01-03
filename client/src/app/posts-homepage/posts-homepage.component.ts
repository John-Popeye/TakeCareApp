import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterSharingService} from "../left-menu/post-filter-popup/filter-sharing.service";
import {FilterTo} from "../model/filterTo";
import {AdvertisementEto} from "../model/advertisementEto";
import {ActivatedRoute, Router} from "@angular/router";
import {ReplaySubject, switchMap, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {RestService} from "../common/services/restService/rest.service";
import {POST_DETAILS, POSTS_HOMEPAGE_NUMBER} from "../app-routing-consts";

@Component({
  selector: 'app-posts-homepage',
  templateUrl: './posts-homepage.component.html',
  styleUrls: ['./posts-homepage.component.css']
})
export class PostsHomepageComponent implements OnInit, OnDestroy{

  enabledFilters: FilterTo;
  posts: AdvertisementEto[];
  pageNumber: number;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(private readonly filterService: FilterSharingService,
              private readonly toastrService: ToastrService,
              private readonly router: Router, private readonly activatedRoute: ActivatedRoute,
              private readonly restService: RestService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.pageNumber = +param.get('page');
      this.subscribeToFilterSubject()
    })
  }

  removeFilters(){
    this.filterService.emitNewFilter(new FilterTo());
  }

  subscribeToFilterSubject(){
    this.filterService.getFilterSubscriptiion().pipe(
      takeUntil(this.destroyed$),
      switchMap(obs => {
        this.enabledFilters = obs;
        return this.restService.getPostsForPageWithFilters(this.pageNumber, this.enabledFilters)
      })
    )
      .subscribe((val: any[]) =>{
        console.log(this.pageNumber);
        val.map(value => new AdvertisementEto(value));
        val.map((x: AdvertisementEto) => {
          if(x.base64image){
            return x.base64image = 'data:image/png;base64, '+x.base64image
          }
          else {
            return ''
          }
        })
        this.posts = val
          if(this.pageNumber !== 1 && this.posts.length === 0){
            this.toastrService.error("No more pages to display, redirected to previous page")
            this.navigateToPage(this.pageNumber-1)
          }
      }

      )
  }

  callService(id: number){
    this.router.navigateByUrl(POST_DETAILS(id));
  }

  isFirstPage(){
    return this.pageNumber === 1;
  }

  navigateToPage(pageNumber: number){
    this.router.navigateByUrl(POSTS_HOMEPAGE_NUMBER(pageNumber))


  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }



}
