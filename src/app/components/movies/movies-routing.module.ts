import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { MoviesComponent } from './movies.component';
import { GenreComponent } from './genres/genre.component';
import { GenreResolve } from './movies.service/genres.resolve';
import { MoviesResolve } from './movies.service/movies.resolve';
import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';
import { MoviesDetailsResolve } from './components/movie-detail/movie-detail-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MoviesComponent,
        children: [
          // {path: '', redirectTo: 'search', pathMatch: 'full'},
          {
            path: 'genres/:id/:name',
            component: GenreComponent,
            resolve: {
              movies: MoviesResolve
            }
          },
          {
            path: 'movie/:id',
            component: MovieDetailComponent,
            resolve: {
              movie: MoviesDetailsResolve
            }
          },
          {
            path: 'search',
            component: SearchComponent
          }
        ],
        resolve: {
          genres: GenreResolve
        },
        canActivate: [AuthGuardService]
      }
    ])
  ],
  providers: [ GenreResolve, MoviesResolve, MoviesDetailsResolve ],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
