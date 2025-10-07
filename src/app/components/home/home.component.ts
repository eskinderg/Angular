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
import { AdminNoteApiService } from 'src/app/admin/admin.notes.api.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { AuthPermission } from 'src/app/auth/auth.permission.service';
import { ScatterPlotConnectedChartComponent } from 'src/app/fragments/components/scatterPlotConnectedChart/scatterplotconnected.component';
import { PieChartComponent } from 'src/app/fragments/components/piechart/piechart.component';
import { TruncatePipe } from '../movies/directives/truncate';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [fadeInAnimation],
    imports: [
        CardComponent,
        BarchartComponent,
        ScatterPlotChartComponent,
        PieChartComponent,
        ScatterPlotConnectedChartComponent,
        AsyncPipe,
        UpperCasePipe,
        TruncatePipe
    ],
    providers: [MoviesApiService, MoviesDataService, AdminNoteApiService]
})
export class HomeComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private adminNoteApiService = inject(AdminNoteApiService);
    permission = inject(AuthPermission);
    movieApiService = inject(MoviesApiService);

    public appVersion: string;
    @HostBinding('@routerFadeInAnimation')
    public tvs: Tv[];

    /* from component input binding */
    // @Input() moviesResult: MovieResults;

    public data = this.Owners.pipe(map((o) => o.map((v) => ({ column: v.owner, value: v.total_notes }))));

    ngOnInit() {
        this.tvs = this.route.snapshot.data['tvs'];
        this.appVersion = environment.appVersion;
    }

    get discoveredMovies$() {
        return this.movieApiService.discoverdMovies();
    }

    get Owners(): Observable<
        { owner: string; user_id: string; total_notes: number; active_notes: number }[]
    > {
        return this.adminNoteApiService.UsersInfo;
    }
}
