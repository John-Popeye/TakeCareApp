import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';

export interface Post {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly backendUrl = '/posts'

  constructor(private readonly http: HttpClient) { }

  getAllPosts(): Observable<Array<Post>>{
    return of([])
  }
}
