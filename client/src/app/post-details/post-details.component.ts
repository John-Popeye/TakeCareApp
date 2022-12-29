import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdvertisementEto} from "../model/advertisementEto";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{

  post: AdvertisementEto;

  constructor(private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any ) => {
      this.post = data.post;
    })
  }

}
