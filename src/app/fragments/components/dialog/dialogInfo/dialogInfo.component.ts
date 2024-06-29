import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmOptions } from '../confirm.options';
import { ConfirmState } from '../confirm.state';
/**
 * The component displayed in the confirmation dialog opened by the ConfirmService.
 */
@Component({
    selector: 'app-dialog-info-component',
    templateUrl: './dialogInfo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogInfoComponent {
    options: ConfirmOptions;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    close() {
        this.state.dialog.close('confirmed');
    }

    // no() {
    //   this.state.dialog.dismiss('not confirmed');
    // }
}
