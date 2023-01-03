import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilterPopupComponent } from './post-filter-popup.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {FilterSharingService} from "./filter-sharing.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {FilterTo} from "../../model/filterTo";

describe('PostFilterPopupComponent', () => {
  let component: PostFilterPopupComponent;
  let fixture: ComponentFixture<PostFilterPopupComponent>;

  let mockToastr = {
    info: jasmine.createSpy('toastr info'),
    show: jasmine.createSpy('toastr show'),
    error: jasmine.createSpy('toastr error')
  }

  let routerMock = {
    navigateByUrl: jasmine.createSpy('router')
  }

  let dialogRefMock = {
    close: jasmine.createSpy('dialogRefClose')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      declarations: [ PostFilterPopupComponent ],
      providers: [
        FormBuilder,
        FilterSharingService,
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: mockToastr},
        {provide: MatDialogRef, useValue: dialogRefMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', ()=>{
    component.onNoClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  })

  it('should emit filter on accept', ()=>{
    const filter = new FilterTo();
    component.form.patchValue(filter)
    component.onAccept();
    expect(routerMock.navigateByUrl).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  })
});
