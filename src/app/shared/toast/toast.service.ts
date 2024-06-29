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

    /**
     * Displays success toast message
     * @param {string} message - text message for the toast to display
     * @param {string} header - optional param for setting the toast header.
     * @param {number} delay - optional param for delay setting in milliseconds. Default value is (5000)
     */
    showSuccess(message: string, header?: string, delay: number = 5000) {
        this.show(message, header, { classname: 'bg-success text-light', delay: delay });
    }

    /**
     * Displays error toast message
     * @param {string} message - text message for the toast to display
     * @param {string} header - optional param for setting the toast header.
     * @param {number} delay - optional param for delay setting in milliseconds. Default value is (10000)
     */
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
