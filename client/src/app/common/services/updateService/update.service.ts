import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private updatedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(true)

  getUpdateObservable():  Observable<any>{
    return this.updatedSubject.asObservable();
}
  emitUpdate(): void{
    this.updatedSubject.next(true)
  }

}
