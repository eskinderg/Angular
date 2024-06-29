import { Component, HostBinding } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast-global',
    templateUrl: './toast.global.component.html'
})
export class ToastGlobalComponent {
    constructor(public toastService: ToastService) {}

    @HostBinding('class') class: string = 'toast-container position-fixed bottom-0 end-0 p-3';

    @HostBinding('style.z-index') zIndex = 1200;
}
