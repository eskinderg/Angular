import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { resolveTvs } from './tvsResolve';
import { discoverResolver } from '../movies/service/discover.resolve';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            tvs: resolveTvs,
            moviesResult: discoverResolver
        }
    }
];
