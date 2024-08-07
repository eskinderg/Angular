import { NgModule } from '@angular/core';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { TableComponent } from './components/table/table.component';

import { NgaModule } from '../../fragments/nga.module';
import { MoviesApiService } from '../movies/service/movies.api.service';
import { MoviesDataService } from '../movies/service/movies.data.service';
import { TvsResolve } from '../movies/service/tvs.resolve';

@NgModule({
    declarations: [HomeComponent, TableComponent],
    exports: [HomeComponent],
    imports: [SharedModule, NgaModule, HomeRoutingModule],
    providers: [MoviesDataService, MoviesApiService, TvsResolve, provideHttpClient(withJsonpSupport())]
})
export class HomeModule {}
