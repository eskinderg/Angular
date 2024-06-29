import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MoviesComponent } from './movies.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';

import { MoviesDataService } from './service/movies.data.service';
import { MoviesApiService } from './service/movies.api.service';

import { NgaModule } from '../../fragments/nga.module';

import { GenreListItemComponent } from './left.view/genre-list-item/genre-list-item.component';
import { LeftViewComponent } from './left.view/left.view.component';
import { RightViewComponent } from './right.view/right-view.component';
import { MovieCardComponent } from './components/movie.card/movie.card.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';

import { MovieDialogComponent } from './components/dialog/movie-dialog.component';
import { MovieDialogService } from './service/movie.dialog.service';

@NgModule({
    imports: [SharedModule, NgaModule, NgbModule, MoviesRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
        MoviesComponent,
        GenreListItemComponent,
        LeftViewComponent,
        RightViewComponent,
        SearchComponent,
        MovieCardComponent,
        MovieDetailComponent,
        MovieDialogComponent
    ],
    exports: [MoviesComponent],
    providers: [MovieDialogService, MoviesApiService, MoviesDataService]
})
export class MoviesModule {}
