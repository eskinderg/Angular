import { Component } from '@angular/core';
import { ConfirmOptions } from './confirm.options';
import { ConfirmState } from './confirm.state';

/**
 * The component displayed in the confirmation dialog opened by the ConfirmService.
 */
@Component({
    selector: 'app-confirm-dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['dialog.component.scss']
})
export class ConfirmDialogComponent {
    options: ConfirmOptions;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    yes() {
        this.state.dialog.close('confirmed');
    }

    no() {
        this.state.dialog.dismiss('not confirmed');
    }
}
