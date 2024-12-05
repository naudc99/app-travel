import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDestinationReviewComponent } from './delete-destination-review.component';

describe('DeleteDestinationReviewComponent', () => {
  let component: DeleteDestinationReviewComponent;
  let fixture: ComponentFixture<DeleteDestinationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDestinationReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDestinationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
