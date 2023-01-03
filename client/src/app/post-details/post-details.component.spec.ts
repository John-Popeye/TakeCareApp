import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import {of} from "rxjs";
import {AdvertisementEto} from "../model/advertisementEto";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CreateAddPostComponent} from "../create-edit-post/create-add-post.component";
import {FormBuilder} from "@angular/forms";
import {UpdateService} from "../common/services/updateService/update.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../common/services/restService/rest.service";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "keycloak-angular";

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;

  let mockRestService = {
    postAssignementToPost: jasmine.createSpy('save post').and.returnValue(of(new AdvertisementEto({id: 12}))),
    postUserAssignemntCancelation: jasmine.createSpy('save post').and.returnValue(of(new AdvertisementEto({id: 12}))),
    postPostArchivisation: jasmine.createSpy('save post').and.returnValue(of(new AdvertisementEto({id: 12}))),
  }


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

  let mockToastr = {
    info: jasmine.createSpy('toastr info'),
    show: jasmine.createSpy('toastr show'),
    error: jasmine.createSpy('toastr error')
  }

  let routerMock = {
    navigateByUrl: jasmine.createSpy('router'),
    url: '/edit'
  }

  let activatedRouteMock = {
    data: of({post: examplePost})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      declarations: [PostDetailsComponent],
      providers: [
        UpdateService,
        KeycloakService,
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: RestService, useValue: mockRestService},
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: mockToastr},]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should archive post', ()=> {
    component.archivePost();

    expect(mockRestService.postPostArchivisation).toHaveBeenCalledOnceWith(1);
    expect(mockToastr.info).toHaveBeenCalled();
  })

  it('should assign user to post', ()=> {
    component.cancelAssignmentToPost();

    expect(mockRestService.postUserAssignemntCancelation).toHaveBeenCalledOnceWith(1);
    expect(mockToastr.info).toHaveBeenCalled();
  })

  it('should cancel user assignment to post', ()=> {
    component.assignUserToPost();

    expect(mockRestService.postAssignementToPost).toHaveBeenCalledOnceWith(1);
    expect(mockToastr.info).toHaveBeenCalled();
  })


});
