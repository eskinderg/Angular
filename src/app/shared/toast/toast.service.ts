import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    remove(toast: any) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }

    showSuccess(message: string, header?: string, delay: number = 5000) {
        this.show(message, header, { classname: 'bg-success text-light', delay: delay });
    }

    showDanger(message: string, header?: string, delay: number = 10000) {
        this.show(message, header, { classname: 'bg-danger text-light', delay: delay });
    }

    showStandard(message: string, header?: string) {
        this.show(message, header);
    }

    private show(textOrTpl: string, header?: string, options: any = {}) {
        this.toasts.push({ textOrTpl, header: header, ...options });
    }
}
