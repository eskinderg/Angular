import { Component, Injectable, Directive } from '@angular/core';
import { ConfirmOptions } from './confirm.options';
import { ConfirmState } from './confirm.state';

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
  selector: 'app-confirm-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ConfirmModalComponent {

  options: ConfirmOptions;

  constructor(private state: ConfirmState) {
    this.options = state.options;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}

