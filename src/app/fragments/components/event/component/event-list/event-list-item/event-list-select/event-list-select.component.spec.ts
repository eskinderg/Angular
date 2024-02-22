import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListSelectComponent } from './event-list-select.component';

describe('EventListSelectComponent', () => {
  let component: EventListSelectComponent;
  let fixture: ComponentFixture<EventListSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EventListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
