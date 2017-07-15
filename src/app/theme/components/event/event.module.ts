import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';

import { EventApiService } from './event.data.service/event.api.service';

import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventListHeaderComponent } from './event/event-list-header/event-list-header.component';
import { EventListItemComponent } from './event/event-list-item/event-list-item.component';
import { EventListFooterComponent} from './event/event-list-footer/event-list-footer.component';

import { EventsResolve } from './event.data.service/EventsResolve';

// import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [FormsModule, CommonModule, NgaModule],
  declarations: [
      EventComponent,
      EventListHeaderComponent,
      EventListItemComponent,
      EventListFooterComponent,
      EventListComponent
    ],
  exports: [
    EventComponent,
    EventListHeaderComponent,
    EventListItemComponent,
    EventListFooterComponent,
    EventListComponent,
    CommonModule,
    FormsModule
  ],
  providers: [EventApiService, EventsResolve]
})
export class EventModule { }
