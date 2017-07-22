import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgaModule } from '../../../theme/nga.module';
import { EventApiService } from './event.data.service/event.api.service';
import { EventComponent } from './component/event.component';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventListHeaderComponent } from './component/event-list-header/event-list-header.component';
import { EventListItemComponent } from './component/event-list-item/event-list-item.component';
import { EventListFooterComponent} from './component/event-list-footer/event-list-footer.component';
import { EventsResolve } from './event.data.service/EventsResolve';
import { EventsActions } from './events.actions';
import { events } from './state/events.reducer';
import { EventsEffect } from './state/events.effect';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    StoreModule.provideStore({ events }),
    EffectsModule.run(EventsEffect)
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
  providers: [EventApiService, EventsResolve, EventsActions]
})
export class EventModule { }
