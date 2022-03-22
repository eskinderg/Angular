import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccess(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  showDanger(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 10000 });
  }

  showStandard(message: string) {
    this.show(message);
  }

  private show(textOrTpl: string, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

}
