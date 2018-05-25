/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventListFooterComponent } from './event-list-footer.component';
import { Event } from '../../event';

describe('EventListFooterComponent', () => {
  let component: EventListFooterComponent;
  let fixture: ComponentFixture<EventListFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListFooterComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListFooterComponent);
    component = fixture.componentInstance;
    component.events = [
      new Event({ id: 1, title: 'Test', complete: false })
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
