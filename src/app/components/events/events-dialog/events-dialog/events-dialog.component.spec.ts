import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDialogComponent } from './events-dialog.component';

describe('EventsDialogComponent', () => {
  let component: EventsDialogComponent;
  let fixture: ComponentFixture<EventsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
