import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopToolbarComponent} from './top-toolbar.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../common/services/restService/rest.service";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";
import {KeycloakService} from "keycloak-angular";

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;

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

  let mockRestService = {
    getUncheckedNotifications: jasmine.createSpy('get unchecked notifications').and.returnValue(of([])),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [TopToolbarComponent],
      providers: [
        KeycloakService,
        {provide: RestService, useValue: mockRestService},
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: mockToastr},]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
