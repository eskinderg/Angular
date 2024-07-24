import { NgModule } from '@angular/core';

import { ToastComponent, ToastHeaderDirective } from './toast';

export { ToastComponent as NgbToast, ToastHeaderDirective as NgbToastHeader } from './toast';
export { ToastConfig, ToastOptions } from './toast-config';

@NgModule({
    imports: [ToastComponent, ToastHeaderDirective],
    exports: [ToastComponent, ToastHeaderDirective]
})
export class ToastModule {}
