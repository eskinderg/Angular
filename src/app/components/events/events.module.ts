import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';

import { EventModule } from '../../theme/components/event/event.module';
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
  declarations: [EventsComponent],
})
export class EventsModule { }
