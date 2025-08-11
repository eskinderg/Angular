import { Component, OnInit, HostBinding, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Tv } from '../movies/models/tv';
import { environment } from 'src/environments/environment';
import { CardComponent } from '../../fragments/components/card/card.component';
import { ScatterPlotChartComponent } from '../../fragments/components/scatterPlotChart/scatterPlotChart.component';
import { MoviesApiService } from '../movies/service/movies.api.service';
import { MoviesDataService } from '../movies/service/movies.data.service';
import { BarchartComponent } from 'src/app/fragments/components/barchart/barchart.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [fadeInAnimation],
    imports: [CardComponent, BarchartComponent, ScatterPlotChartComponent],
    providers: [MoviesApiService, MoviesDataService]
})
export class HomeComponent implements OnInit {
    private route = inject(ActivatedRoute);

    public appVersion: string;
    @HostBinding('@routerFadeInAnimation')
    public tvs: Tv[];

    ngOnInit() {
        this.tvs = this.route.snapshot.data['tvs'];
        this.appVersion = environment.appVersion;
    }
}
