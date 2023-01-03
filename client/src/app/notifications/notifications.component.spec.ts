import {NotificationsComponent} from './notifications.component';
import {of} from "rxjs";
import {AdNotification} from "../model/adNotification";
import {NotificationStatusEnum} from "../model/enums/notificationStatusEnum";
import {NotificationTypeEnum} from "../model/enums/notificationTypeEnum";
import {RestService} from "../common/services/restService/rest.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;

  let exampleNotifications: AdNotification[] = [
    {
      id: '1',
      status: NotificationStatusEnum.UNCHECKED,
      postId: '1',
      creationDate: new Date(),
      type: NotificationTypeEnum.NEW_ASSIGNMENT,
      userName: 'testUserName'
    },
    {
      id: '2',
      status: NotificationStatusEnum.CHECKED,
      postId: '1',
      creationDate: new Date(),
      type: NotificationTypeEnum.NEW_ASSIGNMENT,
      userName: 'testUserName'
    },
    {
      id: '3',
      status: NotificationStatusEnum.ARCHIVED,
      postId: '1',
      creationDate: new Date(),
      type: NotificationTypeEnum.NEW_ASSIGNMENT,
      userName: 'testUserName'
    }
  ]

  let mockRestService = {
    getAllNotifications: jasmine.createSpy('get all notifications').and.returnValue(of(exampleNotifications))
  } as any as RestService;

  let mockToastr = {
    info: jasmine.createSpy('toastr info'),
    show: jasmine.createSpy('toastr show'),
    error: jasmine.createSpy('toastr error')
  } as any as ToastrService

  let routerMock = {
    navigateByUrl: jasmine.createSpy('router'),
    url: '/edit'
  } as any as Router

  beforeEach(async () => {
    component = new NotificationsComponent(mockRestService, routerMock, mockToastr)
    component.filterFormControl.patchValue(NotificationStatusEnum.CHECKED)
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter table data by status ', () => {
    component.allNotificationsData = exampleNotifications;
    component.filterTableDataByStatus(NotificationStatusEnum.CHECKED);

    expect(component.tableData.length).toEqual(1);
    expect(component.tableData[0].status).toEqual(NotificationStatusEnum.CHECKED);

    component.filterTableDataByStatus(null);
    expect(component.tableData.length).toEqual(3);
  });
});
