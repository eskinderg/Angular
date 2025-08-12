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
import { AsyncPipe } from '@angular/common';
import { AuthPermission } from 'src/app/auth/auth.permission.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [fadeInAnimation],
    imports: [CardComponent, BarchartComponent, ScatterPlotChartComponent, AsyncPipe],
    providers: [MoviesApiService, MoviesDataService, AdminNoteApiService]
})
export class HomeComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private adminNoteApiService = inject(AdminNoteApiService);
    permission = inject(AuthPermission);

    public appVersion: string;
    @HostBinding('@routerFadeInAnimation')
    public tvs: Tv[];

    public data = this.Owners.pipe(map((o) => o.map((v) => ({ column: v.owner, value: v.total_notes }))));

    ngOnInit() {
        this.tvs = this.route.snapshot.data['tvs'];
        this.appVersion = environment.appVersion;
    }

    get Owners(): Observable<
        { owner: string; user_id: string; total_notes: number; active_notes: number }[]
    > {
        return this.adminNoteApiService.UsersInfo;
    }
}
