import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Tv } from '../movies/models/tv';
import { environment } from 'src/environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [fadeInAnimation]
})
export class HomeComponent implements OnInit {
    public appVersion: string;
    @HostBinding('@routerFadeInAnimation')
    public tvs: Tv[] | undefined;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.tvs = this.route.snapshot.data['tvs'];
        this.appVersion = environment.appVersion;
    }
}
