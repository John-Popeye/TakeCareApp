import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BehaviorSubject} from "rxjs";
import {FilterTo} from "../../model/filterTo";

@Injectable({
  providedIn: 'root'
})
export class FilterSharingService {

  public filterSubject: BehaviorSubject<FilterTo> = new BehaviorSubject<FilterTo>(new FilterTo());

  getFilterSubscriptiion(): Observable<FilterTo>{
    return this.filterSubject.asObservable();
  }

  emitNewFilter(filter: FilterTo): void{
    this.filterSubject.next(filter);
  }
}
