import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDestinationReviewComponent } from './new-destination-review.component';

describe('NewDestinationReviewComponent', () => {
  let component: NewDestinationReviewComponent;
  let fixture: ComponentFixture<NewDestinationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDestinationReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDestinationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
