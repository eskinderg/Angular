import { Injectable } from '@angular/core';
/**
 * A confirmation service, allowing to open a confirmation dialog from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {
    constructor() {}

    /**
     * Opens a confirmation dialog
     * @param options the options for the dialog (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the dialog
     */
}
