import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { resolveTvs } from './tvsResolve';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            tvs: resolveTvs
        }
    }
];
