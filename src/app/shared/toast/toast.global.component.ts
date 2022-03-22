import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'ngbd-toast-global',
  templateUrl: './toast.global.component.html',
  host: {
    'class': 'toast-container position-fixed top-0 end-0 p-3',
    'style': 'z-index: 1200'
  }
})
export class NgbdToastGlobalComponent {
  constructor(public toastService: ToastService) {}
}
