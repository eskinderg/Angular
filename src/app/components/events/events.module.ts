import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../fragments/nga.module';

import { EventModule } from '../../fragments/components/event/event.module';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    EventModule,
    NgaModule,
    NgScrollbarModule,
    NgbModule
  ],
  exports: [],
  declarations: [EventsComponent]
})
export class EventsModule {}
