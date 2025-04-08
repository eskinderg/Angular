import { ChangeDetectionStrategy, Component, viewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-dialog-host',
    template: `<ng-template #container></ng-template>`,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHostComponent {
    private _containerRef = viewChild.required<ViewContainerRef>('container');

    get viewContainerRef(): ViewContainerRef {
        return this._containerRef();
    }
}
