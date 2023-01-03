
import { AllPostsOverviewComponent } from './all-posts-overview.component';
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {AdvertisementEto} from "../model/advertisementEto";

describe('AllPostsOverviewComponent', () => {
  let component: AllPostsOverviewComponent;
  let router: Router;
  let activatedRoute : ActivatedRoute;
  let mockAdvertisementEto = new AdvertisementEto();

  beforeEach(async () => {
    mockAdvertisementEto.id = 12;
    router = jasmine.createSpy('Router') as any;
    router.navigateByUrl = jasmine.createSpy();
    activatedRoute = jasmine.createSpy('ActivatedRoute') as any;
    activatedRoute.data = of([]);
   component = new AllPostsOverviewComponent(router, activatedRoute);

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to post details', ()=> {
    component.navigateToAdDetails(mockAdvertisementEto);

    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/post/12')
  })
});
