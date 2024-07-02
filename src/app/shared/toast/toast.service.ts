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
     * @param {boolean} animate - optional param to set animation
     */
    showSuccess(
        message: string,
        header?: string,
        delay: number = 5000,
        animate: boolean = true,
        autoHide: boolean = true
    ) {
        this.show(message, header, {
            classname: 'bg-success text-light',
            delay: delay,
            animate: animate,
            autoHide: autoHide
        });
    }

    /**
     * Displays error toast message
     * @param {string} message - text message for the toast to display
     * @param {string} header - optional param for setting the toast header.
     * @param {number} delay - optional param for delay setting in milliseconds. Default value is five minutes
     * @param {boolean} animate - optional param to set animation
     */
    showError(
        message: string,
        header?: string,
        delay: number = 1000,
        animate: boolean = true,
        autoHide: boolean = false
    ) {
        this.show(message, header, {
            classname: 'bg-danger text-light',
            delay: delay,
            autoHide: autoHide,
            animate: animate
        });
    }

    showStandard(message: string, header?: string, delay: number = 5000, autoHide: boolean = true) {
        this.show(message, header, { delay: delay, autoHide: autoHide });
    }

    private show(text: string, header?: string, options: any = {}) {
        this.toasts.push({ text, header: header, ...options });
    }
}
