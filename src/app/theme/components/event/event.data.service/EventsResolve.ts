import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventDataService } from './event.data.service';
import { Event } from '../event';

@Injectable()
export class EventsResolve implements Resolve<Event[]> {

  constructor(private eventDataService: EventDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.eventDataService.getAllEvents();
  }
}