import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDialogWrapperComponent } from './events-dialog-wrapper.component';

describe('EventsDialogWrapperComponent', () => {
  let component: EventsDialogWrapperComponent;
  let fixture: ComponentFixture<EventsDialogWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDialogWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsDialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
