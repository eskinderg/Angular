import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MovieListViewComponent } from './movieView/movie-view.component';
import { GenreResolve } from './movies.service/genres.resolve';
import { SearchComponent } from './search/search.component';
import { MoviesDetailsResolve } from './components/movie-detail/movie-detail-resolve';
import { MoviesResultResolve } from './movies.service/movie-results.resolve';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MoviesComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'search',
                        pathMatch: 'full'
                    },
                    {
                        path: 'genres/:id/:name/:page',
                        component: MovieListViewComponent,
                        data: {
                            alwaysRefresh: true
                        },
                        resolve: {
                            moviesResult: MoviesResultResolve
                        }
                    },
                    {
                        path: 'genres/:id/:name',
                        data: {
                            alwaysRefresh: true
                        },
                        component: MovieListViewComponent,
                        resolve: {
                            moviesResult: MoviesResultResolve
                        }
                    },
                    {
                        path: 'search',
                        component: SearchComponent
                    },
                    {
                        path: 'search/:searchText',
                        component: SearchComponent,
                        data: {
                            searchText: 'asdf'
                        }
                    }
                ],
                resolve: {
                    genres: GenreResolve
                }
                // canActivate: [AuthGuardService]
            }
        ])
    ],
    providers: [GenreResolve, MoviesResultResolve, MoviesDetailsResolve],
    exports: [RouterModule]
})
export class MoviesRoutingModule {}
