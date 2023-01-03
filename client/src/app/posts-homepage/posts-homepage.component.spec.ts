import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHomepageComponent } from './posts-homepage.component';
import {of} from "rxjs";
import {AdvertisementEto} from "../model/advertisementEto";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {PostDetailsComponent} from "../post-details/post-details.component";
import {UpdateService} from "../common/services/updateService/update.service";
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../common/services/restService/rest.service";
import {ToastrService} from "ngx-toastr";
import {FilterSharingService} from "../left-menu/post-filter-popup/filter-sharing.service";
import {FilterTo} from "../model/filterTo";

describe('PostsHomepageComponent', () => {
  let component: PostsHomepageComponent;
  let fixture: ComponentFixture<PostsHomepageComponent>;

  let examplePost = new AdvertisementEto({
    id: 1,
    title: 'Test Title',
    animalDescription: 'Test AnimalDesc',
    startDate: new Date(),
    endDate: new Date(),
    base64image: undefined,
    description: 'example description',
    phoneNumber: '123456789',
    address: {
      city: 'Wrocław',
      zipCode: '52-131',
      street: 'Mickiewicza',
      homeNumber: '12a',
      flatNumber: '5'
    }
  })

  let mockRestService = {
    getPostsForPageWithFilters: jasmine.createSpy('save post').and.returnValue(of([examplePost])),
  }

  let mockToastr = {
    info: jasmine.createSpy('toastr info'),
    show: jasmine.createSpy('toastr show'),
    error: jasmine.createSpy('toastr error')
  }

  let routerMock = {
    navigateByUrl: jasmine.createSpy('router'),
    routeReuseStrategy: {
      shouldReuseRoute: jasmine.createSpy('route reuse strategy')
    }
  }

  let activatedRouteMock = {
    paramMap: of({
      get: jasmine.createSpy().and.returnValue('1')
    })
  }

  let filterServiceMock = {
    getFilterSubscriptiion: jasmine.createSpy('filter').and.returnValue(of(new FilterTo())),
    emitNewFilter: jasmine.createSpy('new filter emit')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      declarations: [PostsHomepageComponent],
      providers: [
        {provide: FilterSharingService, iseValue: filterServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: RestService, useValue: mockRestService},
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: mockToastr},]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get posts for page with filter object on initialization', () => {
    expect(component.enabledFilters = new FilterTo())
    expect(mockRestService.getPostsForPageWithFilters).toHaveBeenCalledWith(1,new FilterTo())
  });
});
