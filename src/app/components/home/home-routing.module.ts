import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MoviesApiService } from '../movies/service/movies.api.service';
import { TvsResolve } from '../movies/service/tvs.resolve';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                resolve: {
                    tvs: TvsResolve
                }
            }
        ])
    ],
    providers: [MoviesApiService],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
