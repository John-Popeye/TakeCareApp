import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddPostComponent } from './create-add-post.component';

describe('CreateAddPostComponent', () => {
  let component: CreateAddPostComponent;
  let fixture: ComponentFixture<CreateAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
