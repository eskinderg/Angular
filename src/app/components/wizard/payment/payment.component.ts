import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent {}
