import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../model/advertisementEto";
import {AdvertisementStatusEnum} from "../model/enums/advertisementStatusEnum";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-posts-overview',
  templateUrl: './all-posts-overview.component.html',
  styleUrls: ['./all-posts-overview.component.css']
})
export class AllPostsOverviewComponent implements OnInit {

  filterFormControl: FormControl = new FormControl();
  selectedFilter: AdvertisementStatusEnum;
  allPostsData: AdvertisementEto[] = [];
  statuses: string[] = [AdvertisementStatusEnum.OPEN.toString(), AdvertisementStatusEnum.ASSIGNED.toString(), AdvertisementStatusEnum.CLOSED.toString()];
  tableData: AdvertisementEto[] = [];
  displayedColumns: string[] = ['startDate', 'title', 'city', 'status'];

  constructor(private readonly httpClient: HttpClient) {
  }

  ngOnInit(){

    this.filterFormControl.valueChanges.subscribe(val => {
      if(val){
        this.filterTableDataByStatus(val);
      }
    })
    this.httpClient.get('/post-service/v1/posts/all-user-created').subscribe((posts: AdvertisementEto[]) => {
      this.allPostsData = posts;
      this.tableData = this.allPostsData;
    })
  }

  navigateToAdDetails(row: AdvertisementEto){
    console.log(row)
  }

  private filterTableDataByStatus(status: AdvertisementStatusEnum){
    this.tableData = this.allPostsData.filter(ad => ad.status === status);
  }


}
