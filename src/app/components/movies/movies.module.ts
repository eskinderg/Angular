import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MoviesComponent } from './movies.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';

import { MoviesDataService } from './movies.service/movies.data.service';
import { MoviesApiService } from './movies.service/movies.api.service';

import { NgaModule } from '../../theme/nga.module';

import { GenreListItemComponent } from './components/genre-list-item/genre-list-item.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { GenreComponent } from './genres/genre.component';
import { MovieCardComponent } from './components/movie.card/movie.card.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';

import { NgbdRatingDecimalComponent } from './components/rating/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    NgbModule,
    MoviesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ],
  declarations: [
    MoviesComponent,
    GenreListItemComponent,
    GenreListComponent,
    GenreComponent,
    SearchComponent,
    MovieCardComponent,
    MovieDetailComponent,
    NgbdRatingDecimalComponent
  ],
  exports: [MoviesComponent],
  providers: [
    MoviesApiService,
    MoviesDataService
  ]
})
export class MoviesModule { }
