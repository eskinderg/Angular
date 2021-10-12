import { Component, Injectable, Directive } from '@angular/core';
import { ConfirmOptions } from '../confirm.options';
import { ConfirmState } from '../confirm.state';
/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
  selector: 'app-modal-info-component',
  templateUrl: './modalInfo.component.html'
})
export class ModalInfoComponent {

  options: ConfirmOptions;

  constructor(private state: ConfirmState) {
    this.options = state.options;
  }

  close() {
    this.state.modal.close('confirmed');
  }

  // no() {
  //   this.state.modal.dismiss('not confirmed');
  // }
}

