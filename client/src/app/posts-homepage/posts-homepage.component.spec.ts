import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHomepageComponent } from './posts-homepage.component';

describe('PostsHomepageComponent', () => {
  let component: PostsHomepageComponent;
  let fixture: ComponentFixture<PostsHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
