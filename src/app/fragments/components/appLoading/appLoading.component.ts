import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-loading',
    template: `<div [ngClass]="{ hide: !loading }" class="appProgress">
        <div class="appLoading"></div>
    </div>`,
    styleUrls: ['appLoading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class AppLoadingComponent {
    private _loading: boolean = true;

    constructor(private cd: ChangeDetectorRef) {}

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
