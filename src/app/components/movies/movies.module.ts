import { NgModule } from '@angular/core';

import { MoviesComponent } from './movies.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';

import { MoviesDataService } from './service/movies.data.service';
import { MoviesApiService } from './service/movies.api.service';

import { NgaModule } from '../../fragments/nga.module';

import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';

import { MovieDialogComponent } from './components/dialog/movie-dialog.component';
import { MovieDialogService } from './service/movie.dialog.service';
import { LeftViewModule } from './left.view/left.view.module';
import { RightViewModule } from './right.view/right.view.module';

@NgModule({
    imports: [SharedModule, NgaModule, MoviesRoutingModule, LeftViewModule, RightViewModule],
    declarations: [MoviesComponent, SearchComponent, MovieDetailComponent, MovieDialogComponent],
    exports: [MoviesComponent],
    providers: [MovieDialogService, MoviesApiService, MoviesDataService]
})
export class MoviesModule {}
