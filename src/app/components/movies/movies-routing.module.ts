import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { RightViewComponent } from './right.view/right-view.component';
import { GenreResolve } from './service/genres.resolve';
import { SearchComponent } from './search/search.component';
import { MoviesDetailsResolve } from './components/movie-detail/movie-detail-resolve';
import { MoviesResultResolve } from './service/movie-results.resolve';

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
                        component: RightViewComponent,
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
                        component: RightViewComponent,
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
