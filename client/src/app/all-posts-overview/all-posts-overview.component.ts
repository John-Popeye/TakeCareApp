import {Component, OnInit} from '@angular/core';
import {AdvertisementEto} from "../model/advertisementEto";
import {AdvertisementStatusEnum} from "../model/enums/advertisementStatusEnum";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ALL_USER_POSTS, POST_DETAILS} from "../app-routing-consts";

@Component({
  selector: 'app-all-posts-overview',
  templateUrl: './all-posts-overview.component.html',
  styleUrls: ['./all-posts-overview.component.css']
})
export class AllPostsOverviewComponent implements OnInit {

  filterFormControl: FormControl = new FormControl();
  allPostsData: AdvertisementEto[] = [];
  statuses: string[] = [AdvertisementStatusEnum.OPEN.toString(), AdvertisementStatusEnum.ASSIGNED.toString(), AdvertisementStatusEnum.CLOSED.toString()];
  tableData: AdvertisementEto[] = [];
  displayedColumns: string[] = ['startDate', 'title', 'city', 'status'];

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(){
    this.filterFormControl.valueChanges.subscribe(val => {
      if(val){
        this.filterTableDataByStatus(val);
      }
    })
    this.activatedRoute.data.subscribe((data: any) => {
      this.allPostsData = data.posts;
      this.tableData = this.allPostsData;
    })
  }

  navigateToAdDetails(row: AdvertisementEto){
    this.router.navigateByUrl(POST_DETAILS(row.id))
  }

  public filterTableDataByStatus(status: AdvertisementStatusEnum){
    if(status === null){
      this.tableData = this.allPostsData;
      return;
    }
    this.tableData = this.allPostsData.filter(ad => ad.status === status);
  }

  public isAllPostsCreatedByUser(){
    return this.router.url === ALL_USER_POSTS
  }


}
