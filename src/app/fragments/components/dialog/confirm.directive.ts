import { Directive, TemplateRef, inject } from '@angular/core';
import { ConfirmState } from './confirm.state';
/**
 * Directive allowing to get a reference to the template containing the confirmation dialog component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-dialog-component></confirm-dialog-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
    selector: '[appConfirm]',
    standalone: true
})
export class ConfirmTemplateDirective {
    constructor() {
        const confirmTemplate = inject<TemplateRef<any>>(TemplateRef);
        const state = inject(ConfirmState);

        state.template = confirmTemplate;
    }
}
