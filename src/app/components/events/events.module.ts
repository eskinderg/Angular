import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../fragments/nga.module';

import { EventModule } from '../../fragments/components/event/event.module';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EventDataService } from 'src/app/fragments/components/event/event.data.service/event.data.service';
import { EventsResolve } from 'src/app/fragments/components/event/event.data.service/EventsResolve';

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
    providers: [EventDataService, EventsResolve]
})
export class EventsModule {}
