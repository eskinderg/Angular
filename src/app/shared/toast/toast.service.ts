import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    remove(toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }

    showSuccess(message: string, header?: string) {
        this.show(message, header, { classname: 'bg-success text-light', delay: 5000 });
    }

    showDanger(message: string, header?: string) {
        this.show(message, header, { classname: 'bg-danger text-light', delay: 10000 });
    }

    showStandard(message: string, header?: string) {
        this.show(message, header);
    }

    private show(textOrTpl: string, header?: string, options: any = {}) {
        this.toasts.push({ textOrTpl, header: header, ...options });
    }
}
