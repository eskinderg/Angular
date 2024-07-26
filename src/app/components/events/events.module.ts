import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgaModule } from '../../fragments/nga.module';

import { EventModule } from '../../fragments/components/event/event.module';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventDataService } from 'src/app/fragments/components/event/event.data.service/event.data.service';
import { EventsResolve } from 'src/app/fragments/components/event/event.data.service/EventsResolve';

@NgModule({
    imports: [CommonModule, EventsRoutingModule, SharedModule, EventModule, NgaModule],
    exports: [],
    declarations: [EventsComponent],
    providers: [EventDataService, EventsResolve]
})
export class EventsModule {}
