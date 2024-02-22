import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOptions } from './confirm.options';
import { ConfirmState } from './confirm.state';
/**
 * A confirmation service, allowing to open a confirmation dialog from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {
  constructor(
    private dialogService: NgbModal,
    private state: ConfirmState
  ) {}

  /**
   * Opens a confirmation dialog
   * @param options the options for the dialog (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the dialog
   */
  confirm(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.dialog = this.dialogService.open(this.state.template, {
      backdrop: options.backdrop,
      centered: true
    });
    return this.state.dialog.result;
  }

  openInfoDialog(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.dialog = this.dialogService.open(this.state.template, {
      backdrop: options.backdrop,
      scrollable: options.scrollable,
      centered: options.centered
    });
    return this.state.dialog.result;
  }
}
