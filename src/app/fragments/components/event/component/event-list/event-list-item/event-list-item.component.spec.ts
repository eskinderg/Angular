/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventListItemComponent } from './event-list-item.component';
import { Event } from '../../event';

describe('EventListItemComponent', () => {
  let component: EventListItemComponent;
  let fixture: ComponentFixture<EventListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListItemComponent);
    component = fixture.componentInstance;
    component.event = new Event({ id: 1, title: 'Test', complete: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
