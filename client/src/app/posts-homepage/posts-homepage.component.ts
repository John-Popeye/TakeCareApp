import {Component, OnInit} from '@angular/core';
import {SearchFilter} from "./common/to/SearchFilter";
import {FilterSharingService} from "../left-menu/post-filter-popup/filter-sharing.service";
import {FilterTo} from "../model/filterTo";
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../model/advertisementEto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-homepage',
  templateUrl: './posts-homepage.component.html',
  styleUrls: ['./posts-homepage.component.css']
})
export class PostsHomepageComponent implements OnInit{

  enabledFilters: FilterTo;
  posts: AdvertisementEto[];


  constructor(private readonly filterService: FilterSharingService, private readonly router: Router,
              private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
      this.httpClient.get('/post-service/v1/posts/page/1').subscribe((val: any[]) => {
        console.log(val)
        val.map(value => new AdvertisementEto(value));
        val.map((x: AdvertisementEto) => {
          if(x.base64image){
            return x.base64image = 'data:image/png;base64, '+x.base64image
          }
          else {
            return ''
            }
          })
        this.posts = val})
    this.subscribeToFilterSubject();
  }



  removeFilters(){
    this.filterService.emitNewFilter(new FilterTo());
  }

  subscribeToFilterSubject(){
    this.filterService.getFilterSubscriptiion().subscribe(filter => {
      this.enabledFilters = filter;
    })
  }

  callService(id: number){
    this.router.navigateByUrl(`/post/${id}`);
  }



}
