import { NgModule } from '@angular/core';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { TableComponent } from './components/table/table.component';

import { NgaModule } from '../../fragments/nga.module';
import { MoviesApiService } from '../movies/movies.service/movies.api.service';
import { MoviesDataService } from '../movies/movies.service/movies.data.service';
import { TvsResolve } from '../movies/movies.service/tvs.resolve';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [SharedModule, NgaModule, HomeRoutingModule, HttpClientJsonpModule, NgScrollbarModule],
  declarations: [HomeComponent, TableComponent],
  exports: [HomeComponent],
  providers: [MoviesDataService, MoviesApiService, TvsResolve]
})
export class HomeModule {}
