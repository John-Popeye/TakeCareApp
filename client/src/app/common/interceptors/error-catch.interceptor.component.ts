import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        const err = new Error('An unexpected error on server side occured')
        this.toastr.error('An unexpected error on server side occured')
        return throwError(()=> err)
      })
    );
  }
}
