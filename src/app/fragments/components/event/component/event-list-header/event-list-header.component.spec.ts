/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListHeaderComponent } from './event-list-header.component';
import { FormsModule } from '@angular/forms';

describe('EventListHeaderComponent', () => {
    let component: EventListHeaderComponent;
    let fixture: ComponentFixture<EventListHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, EventListHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventListHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
