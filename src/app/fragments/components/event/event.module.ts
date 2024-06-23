import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../fragments/nga.module';
import { EventComponent } from './component/event.component';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventListHeaderComponent } from './component/event-list-header/event-list-header.component';
import { EventListItemComponent } from './component/event-list/event-list-item/event-list-item.component';
import { EventListFooterComponent } from './component/event-list-footer/event-list-footer.component';
import { EventListSelectComponent } from './component/event-list/event-list-item/event-list-select/event-list-select.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [FormsModule, CommonModule, NgaModule, NgbModule, NgScrollbarModule, RouterModule],
  declarations: [
    EventComponent,
    EventListHeaderComponent,
    EventListItemComponent,
    EventListFooterComponent,
    EventListComponent,
    EventListSelectComponent
  ],
  exports: [
    EventComponent,
    EventListHeaderComponent,
    EventListItemComponent,
    EventListFooterComponent,
    EventListComponent,
    EventListSelectComponent
  ]
})
export class EventModule {}
