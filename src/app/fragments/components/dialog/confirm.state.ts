import { Injectable, TemplateRef } from '@angular/core';
import { ConfirmOptions } from './confirm.options';
/**
 * An internal service allowing to access, from the confirm dialog component, the options and the dialog reference.
 * It also allows registering the TemplateRef containing the confirm dialog component.
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
     * The last opened confirmation dialog
     */
    /**
     * The template containing the confirmation dialog component
     */
    template: TemplateRef<any>;
}
