import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsModalWrapperComponent } from './events-modal-wrapper.component';

describe('EventsModalWrapperComponent', () => {
  let component: EventsModalWrapperComponent;
  let fixture: ComponentFixture<EventsModalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsModalWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
