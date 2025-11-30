import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <div [class.hide]="!loading" class="app-progress">
            <div class="app-loading"></div>
        </div>
    `,
    styleUrls: ['appLoading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoadingComponent {
    private cd = inject(ChangeDetectorRef);

    private _loading: boolean = true;

    @Input()
    public set loading(val: boolean) {
        this._loading = val;
        this.cd.detectChanges();
    }

    public get loading() {
        return this._loading;
    }

    // public get loading(): Observable<boolean> {
    //     return combineLatest([of(this._loading), this.store.select(fromPreference.isLoading)]).pipe(
    //         map(([loading, preferenceLoading]) => {
    //             return loading || preferenceLoading;
    //         })
    //     );
    // }
}
