import {NotificationStatusEnum} from "./enums/notificationStatusEnum";
import {NotificationTypeEnum} from "./enums/notificationTypeEnum";

export class AdNotification{
  id: string;
  postId: string;
  type: NotificationTypeEnum;
  creationDate: Date;
  status: NotificationStatusEnum;
  userName: string;
}
