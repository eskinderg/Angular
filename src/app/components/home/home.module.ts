import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { EventModule } from '../../theme/components/event/event.module';
import { TableComponent } from './components/table/table.component';

import { NgaModule } from '../../theme/nga.module';
import { MoviesApiService } from '../movies/movies.service/movies.api.service';
import { MoviesDataService } from '../movies/movies.service/movies.data.service';
import { TvsResolve } from '../movies/movies.service/tvs.resolve';
import { EventApiService } from 'app/theme/components/event/event.data.service/event.api.service';
import { ScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    HomeRoutingModule,
    JsonpModule,
    EventModule,
    ScrollbarModule
  ],
  declarations: [
    HomeComponent,
    TableComponent
  ],
  exports: [HomeComponent],
  providers: [ EventApiService, MoviesDataService, MoviesApiService, TvsResolve ]
})
export class HomeModule { }
