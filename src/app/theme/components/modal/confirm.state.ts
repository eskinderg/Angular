
import { Injectable , TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOptions } from './confirm.options';
/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
  /**
   * The last options passed ConfirmService.confirm()
   */
  options: ConfirmOptions;

  /**
   * The last opened confirmation modal
   */
  modal: NgbModalRef;

  /**
   * The template containing the confirmation modal component
   */
  template: TemplateRef<any>;
}
