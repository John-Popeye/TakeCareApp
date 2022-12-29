import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdvertisementEto} from "../../model/advertisementEto";
import {Address} from "../../model/address";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  constructor(private readonly httpClient: HttpClient) { }

  getRecentCaresForUser(userName: string): Observable<AdvertisementEto[]>{
    return of([
      {
        startDate: new Date("2022-01-15"),
        endDate: new Date("2022-02-17"),
        address: {
          city: "Wrocław"
        } as Address
      } as AdvertisementEto,
      {
        startDate: new Date("2022-01-15"),
        endDate: new Date("2022-02-17"),
        address: {
          city: "Wrocław"
        } as Address
      } as AdvertisementEto,
      {
        startDate: new Date("2022-01-15"),
        endDate: new Date("2022-02-17"),
        address: {
          city: "Wrocław"
        } as Address
      } as AdvertisementEto,
      {
        startDate: new Date("2022-01-15"),
        endDate: new Date("2022-02-17"),
        address: {
          city: "Wrocław"
        } as Address
      } as AdvertisementEto,
      {
        startDate: new Date("2022-01-15"),
        endDate: new Date("2022-02-17"),
        address: {
          city: "Wrocław"
        } as Address
      } as AdvertisementEto
    ])
  }
}
