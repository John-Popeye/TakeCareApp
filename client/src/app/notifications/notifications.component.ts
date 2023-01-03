import {Component, OnInit} from '@angular/core';
import {AdNotification} from "../model/adNotification";
import {timer} from "rxjs";
import {NotificationStatusEnum} from "../model/enums/notificationStatusEnum";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationTypeEnum} from "../model/enums/notificationTypeEnum";
import _ from "lodash";
import {RestService} from "../common/services/restService/rest.service";
import {POST_DETAILS} from "../app-routing-consts";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {


  constructor(private readonly restService: RestService, private readonly router: Router, private readonly toastrService: ToastrService) {
  }
  filterFormControl: FormControl = new FormControl();
  allNotificationsData: AdNotification[] = [];
  statuses: string[] = [NotificationStatusEnum.ARCHIVED.toString(), NotificationStatusEnum.CHECKED.toString(), NotificationStatusEnum.UNCHECKED.toString()];
  tableData: AdNotification[] = [];
  displayedColumns: string[] = ['goToDetails','creationDate', 'status', 'type', 'action'];

  ngOnInit() {
    this.filterFormControl.valueChanges.subscribe(val => {
      if(val){
        this.filterTableDataByStatus(val);
      }
    })

    timer(0,10000).subscribe( ()=>
    this.restService.getAllNotifications().subscribe((val: AdNotification[]) => {
    this.allNotificationsData = val
      if(this.filterFormControl.value !== '') {
        this.filterTableDataByStatus(this.filterFormControl.value);
      }
    })
  )
  }

  getDescriptionForStatus(type: NotificationTypeEnum): string{
    switch (type) {
      case NotificationTypeEnum.ASSIGNMENT_CANCELED:
        return 'User canceled his assignment to your post';
      case NotificationTypeEnum.NEW_ASSIGNMENT:
        return 'User assigned himself to your post';
      case NotificationTypeEnum.ASSIGNMENT_CLOSED:
        return 'User closed job you were assgined to';
      case NotificationTypeEnum.ASSIGNMENT_EDITED:
        return 'User closed job you were assgined to';
      default:
        return '';
    }


  }

  isStatusUnchecked(status: NotificationStatusEnum){

    return status === NotificationStatusEnum.UNCHECKED;
  }

  isStatusChecked(status: NotificationStatusEnum) {
    return status === NotificationStatusEnum.CHECKED;
  }

  changeNotificationStatusToChecked(notification: AdNotification){
    this.changeNotificationStatus(notification, NotificationStatusEnum.CHECKED)
  }

  changeNotificationStatusToArchived(notification: AdNotification){
    this.changeNotificationStatus(notification, NotificationStatusEnum.ARCHIVED)
  }

  private changeNotificationStatus(notification: AdNotification, status: NotificationStatusEnum){
    notification.status = status;
    this.restService.saveNotificationWithStatusChange(notification).subscribe((val: AdNotification) => {
      notification = val;
      this.toastrService.info("Status Change Succesfull")
    })
  }

  public filterTableDataByStatus(status: NotificationStatusEnum){
    if(!status){
      this.tableData = this.allNotificationsData;
      this.sortTableDataByDate();
      return
    }
    if(status){
      this.tableData = this.allNotificationsData.filter(ad => ad.status === status);
      this.sortTableDataByDate();
      return;
    }
  }

  navigateToAdDetails(postId: string){
    this.router.navigateByUrl(POST_DETAILS(+postId))
  }

  sortTableDataByDate(){
    this.tableData = _.orderBy(this.tableData, ['creationDate'], ['desc']);
  }

}
