import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilterPopupComponent } from './post-filter-popup.component';

describe('PostFilterPopupComponent', () => {
  let component: PostFilterPopupComponent;
  let fixture: ComponentFixture<PostFilterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFilterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
