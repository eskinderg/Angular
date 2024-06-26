import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { MoviesComponent } from './movies.component';
import { MovieListViewComponent } from './movieView/movie-view.component';
import { GenreResolve } from './movies.service/genres.resolve';
import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';
import { MoviesDetailsResolve } from './components/movie-detail/movie-detail-resolve';
import { MoviesResultResolve } from './movies.service/movie-results.resolve';
import { MovieDetailDialogComponent } from './movie-dialog/movie-dialog.component';
import { MovieDialogWrapperComponent } from './movie-dialog/movie-dialog-wrapper/movie-dialog-wrapper.component';

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
                        },
                        children: [
                            {
                                path: 'dialog/:movieid',
                                component: MovieDialogWrapperComponent,
                                data: {
                                    component: MovieDetailDialogComponent
                                },
                                resolve: {
                                    movieDetail: MoviesDetailsResolve
                                }
                            }
                        ]
                    },
                    {
                        path: 'genres/:id/:name',
                        data: {
                            alwaysRefresh: true
                        },
                        component: MovieListViewComponent,
                        resolve: {
                            moviesResult: MoviesResultResolve
                        },
                        children: [
                            {
                                path: 'dialog/:movieid',
                                component: MovieDialogWrapperComponent,
                                data: {
                                    component: MovieDetailDialogComponent
                                },
                                resolve: {
                                    movieDetail: MoviesDetailsResolve
                                }
                            }
                        ]
                    },
                    {
                        path: 'genres/:id/:name/:page/movie/:idmovie',
                        component: MovieDetailComponent,
                        resolve: {
                            movie: MoviesDetailsResolve
                        }
                    },
                    {
                        path: 'genres/:id/:name/movie/:idmovie',
                        component: MovieDetailComponent,
                        resolve: {
                            movie: MoviesDetailsResolve
                        }
                    },
                    {
                        path: 'search',
                        component: SearchComponent
                    },
                    {
                        path: 'search/dialog/:movieid',
                        component: MovieDialogWrapperComponent,
                        data: {
                            component: MovieDetailDialogComponent
                        },
                        resolve: {
                            movieDetail: MoviesDetailsResolve
                        }
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
