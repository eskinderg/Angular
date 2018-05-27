import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOptions } from './confirm.options';
import { ConfirmState } from './confirm.state';
/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {

  constructor(private modalService: NgbModal, private state: ConfirmState) {}

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  confirm(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template, { backdrop: false, centered: true } );
    return this.state.modal.result;
  }

  openInfoModal(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template, { backdrop: true } );
    return this.state.modal.result;
  }
}
