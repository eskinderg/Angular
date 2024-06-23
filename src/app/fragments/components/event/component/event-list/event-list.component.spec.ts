/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EventListComponent } from './event-list.component';
import { Event } from '../../event';

describe('EventListComponent', () => {
    let component: EventListComponent;
    let fixture: ComponentFixture<EventListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventListComponent);
        component = fixture.componentInstance;

        fixture.whenStable().then(() => {
            component.events = [new Event({ id: 1, title: 'Test', complete: false })];
            // fixture.detectChanges();
        });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
