import { Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { RightViewComponent } from './right.view/right-view.component';
import { genreResolver } from './service/genres.resolve';
import { SearchComponent } from './search/search.component';
import { moviesResultResolver } from './service/movie-results.resolve';

export const moviesRoutes: Routes = [
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
    }
];
