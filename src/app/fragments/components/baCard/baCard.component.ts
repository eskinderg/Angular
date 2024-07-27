import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-ba-card',
    templateUrl: './baCard.component.html',
    styleUrls: ['baCard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaCardComponent {
    @Input() title: string;
    @Input() baCardClass: string;
    @Input() cardType: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() scrollBar: boolean;
    @Input() margin: number;
    @Input() padding: number;
    @Input() height: number;
}
