import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { EventModule } from '../../theme/components/event/event.module';
import { TableComponent } from './components/table/table.component';

import { NgaModule } from '../../theme/nga.module';

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    HomeRoutingModule,
    EventModule
  ],
  declarations: [
    HomeComponent,
    TableComponent
  ],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
