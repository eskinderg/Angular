import { Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { RightViewComponent } from './right.view/right-view.component';
import { genreResolver } from './service/genres.resolve';
import { SearchComponent } from './search/search.component';
import { moviesResultResolver } from './service/movie-results.resolve';
import { WatchListComponent } from './watchlist/watchlist.component';
import { watchListResolver } from './service/watchlist.resolve';
import { DiscoverComponent } from './discover/discover.component';
// import { discoverResolver } from './service/discover.resolve';
import { MovieDetailComponent } from './components/movie-detail/movie.detail.component';
import { moviesDetailsResolve } from './components/movie-detail/movie-detail-resolve';
import { WatchedListComponent } from './watchedHistory/watchedHistory.component';
import { watchedListResolver } from './service/watchedHistory.resolve';

export const moviesRoutes: Routes = [
    {
        path: '',
        component: MoviesComponent,
        children: [
            {
                path: '',
                component: DiscoverComponent,
                pathMatch: 'full'
            },
            {
                path: '',
                redirectTo: 'search',
                pathMatch: 'full'
            },
            {
                path: 'genres/:id/:name/:page',
                component: RightViewComponent,
                resolve: {
                    moviesResult: moviesResultResolver
                }
            },
            {
                path: 'genres/:id/:name',
                component: RightViewComponent,
                resolve: {
                    moviesResult: moviesResultResolver
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
            genres: genreResolver
        }
        // canActivate: [authGuard]
    },
    {
        path: 'd/:movieId',
        component: MovieDetailComponent,
        resolve: {
            movie: moviesDetailsResolve
        }
    },
    {
        path: 'watchlist',
        component: WatchListComponent,
        resolve: {
            movies: watchListResolver
        }
    },
    {
        path: 'history',
        component: WatchedListComponent,
        resolve: {
            movies: watchedListResolver
        }
    }
];
