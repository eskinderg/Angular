import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';
import { EventComponent } from './component/event.component';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventListHeaderComponent } from './component/event-list-header/event-list-header.component';
import { EventListItemComponent } from './component/event-list-item/event-list-item.component';
import { EventListFooterComponent} from './component/event-list-footer/event-list-footer.component';
import { EventsResolve } from './event.data.service/EventsResolve';

import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    NgScrollbarModule
  ],
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
  providers: [EventsResolve]
})
export class EventModule { }
