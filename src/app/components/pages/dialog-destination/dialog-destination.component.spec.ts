import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDestinationComponent } from './dialog-destination.component';

describe('DialogDestinationComponent', () => {
  let component: DialogDestinationComponent;
  let fixture: ComponentFixture<DialogDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDestinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
