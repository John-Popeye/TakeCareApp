import {AdvertisementStatusEnum} from "./enums/advertisementStatusEnum";
import {Address} from "./address";

export class AdvertisementEto {
  id: number;
  startDate: Date;
  endDate: Date;
  status: AdvertisementStatusEnum
  issuerUserName: string;
  careTakerUserName: string;
  description: string;
  address: Address;
  title:string;
  base64image: string;
  animalDescription: string;
  creationDate: Date;


  public constructor(init?: Partial<AdvertisementEto>) {
    Object.assign(this, init);
  }
}
