import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateAddPostComponent} from './create-add-post.component';
import {FormBuilder} from "@angular/forms";
import {UpdateService} from "../common/services/updateService/update.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../common/services/restService/rest.service";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";
import {AdvertisementEto} from "../model/advertisementEto";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('CreateAddPostComponent', () => {
  let component: CreateAddPostComponent;
  let fixture: ComponentFixture<CreateAddPostComponent>;

  let mockRestService = {
    savePost: jasmine.createSpy('save post').and.returnValue(of(new AdvertisementEto({id: 12})))
  }

  let mockToastr = {
    info: jasmine.createSpy('toastr info'),
    show: jasmine.createSpy('toastr show'),
    error: jasmine.createSpy('toastr error')
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

  let activatedRouteMock = {
    data: of({post: examplePost})
  }

  let routerMock = {
    navigateByUrl: jasmine.createSpy('router'),
    url: '/edit'
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      declarations: [CreateAddPostComponent],
      providers: [
        FormBuilder,
        UpdateService,
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: RestService, useValue: mockRestService},
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: mockToastr},]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch post data into form group', () => {
    expect(JSON.stringify(component.formGroup.value)).toEqual(JSON.stringify(examplePost))
  });

  it('should save post', () => {
    component.createPost();

    expect(mockRestService.savePost).toHaveBeenCalledOnceWith(examplePost);
  });
});
