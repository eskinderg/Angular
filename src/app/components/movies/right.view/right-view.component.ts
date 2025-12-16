import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { Movie } from '../models/movie';
import { MovieDialogService } from '../service/movie.dialog.service';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { PaginationComponent } from 'src/app/fragments/components/appPagination/pagination.component';
import { AsyncPipe } from '@angular/common';
import { MoviesApiService } from '../service/movies.api.service';
import { PreferenceApiService } from 'src/app/preference/preference.api.service';

@Component({
    selector: 'app-right-view',
    templateUrl: 'right-view.component.html',
    styleUrls: ['right-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PaginationComponent, AsyncPipe, MovieCardComponent]
})
export class RightViewComponent implements OnDestroy {
    router = inject(ActivatedRoute);
    route = inject(Router);
    movieModalService = inject(MovieDialogService);
    movieApiService = inject(MoviesApiService);
    preferenceApiService = inject(PreferenceApiService);

    languages$ = this.movieApiService.getLanguages();

    routeSubscription: Subscription;
    apiSubscription: Subscription;

    selectedLanguage$ = this.preferenceApiService.getUserPreferedLanguage();

    private _id: string;
    private _name: string;
    private _page: string;

    @Input() moviesResult: MovieResults;

    /* withComponentInputBinding */
    @Input() set id(value: string) {
        this._id = value;
        document.getElementsByClassName('content')[0].scroll({ top: 0, left: 0, behavior: 'auto' });
    }

    get id(): string {
        return this._id;
    }

    @Input() set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name;
    }

    @Input() set page(value: string) {
        this._page = value;
        document.getElementsByClassName('content')[0].scroll({ top: 0, left: 0, behavior: 'auto' });
    }

    get page(): string {
        return this._page;
    }

    loadPage(page: number) {
        this.route.navigate(['/movies/genres', this.id, this.name, page]);
    }

    get collectionSize() {
        return this.moviesResult.total_pages >= 500 ? 500 * 20 : this.moviesResult.total_pages * 20;
    }

    get UserPreferedLanaguage() {
        // return this.movieApiService.getPreferedMovieLang();
        return this.preferenceApiService.getUserPreferedLanguage();
    }

    languageSelected(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedLanguage = selectElement.value;
        this.movieApiService.setPreferedMovieLang(selectedLanguage);
        this.preferenceApiService.saveLang(selectedLanguage);
        // this.route.navigate(['/movies/genres', this.id, this.name, this.page ? '' : 1]);
    }

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        this.movieModalService.load(event.movieCardComponent);
        this.movieModalService.showDialog();
    }

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();
        this.movieModalService.destroy();
    }
}
