import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinationReviewComponent } from './edit-destination-review.component';

describe('EditDestinationReviewComponent', () => {
  let component: EditDestinationReviewComponent;
  let fixture: ComponentFixture<EditDestinationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDestinationReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDestinationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
