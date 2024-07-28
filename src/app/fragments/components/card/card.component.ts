import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @Input() baCardClass: string;
    @Input() cardType: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() scrollBar: boolean;
    @Input() innerMargin: number;
    @Input() innerPadding: number = 1;
    @Input() outerMargin: number;
    @Input() outerPadding: number;
    @Input() height: number;
    @Input() showHeader: boolean = true;
}
