import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WzCommonComponent } from '../common/common.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [WzCommonComponent, RouterLink]
})
export class PaymentComponent {}
