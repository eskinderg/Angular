import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { TodoModule } from '../shared/components/todo/todo.module';
import { TableComponent } from './components/table/table.component';

import { NgaModule } from '../../theme/nga.module';

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    HomeRoutingModule,
    TodoModule
  ],
  declarations: [
    HomeComponent,
    TableComponent
  ],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
