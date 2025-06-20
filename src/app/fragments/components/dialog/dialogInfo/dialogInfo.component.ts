import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmOptions } from '../confirm.options';
import { ConfirmState } from '../confirm.state';
/**
 * The component displayed in the confirmation dialog opened by the ConfirmService.
 */
@Component({
    selector: 'app-dialog-info-component',
    templateUrl: './dialogInfo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class DialogInfoComponent {
    private state = inject(ConfirmState);

    options: ConfirmOptions;

    constructor() {
        const state = this.state;

        this.options = state.options;
    }

    close() {}

    // no() {
    //   this.state.dialog.dismiss('not confirmed');
    // }
}
