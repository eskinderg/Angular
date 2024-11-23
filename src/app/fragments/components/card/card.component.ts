import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class CardComponent {
    @Input() cardType: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() scrollBar: boolean = true;
    @Input() innerMargin: number;
    @Input() innerPadding: number = 1;
    @Input() outerMargin: number;
    @Input() outerPadding: number;
    @Input() height: number;
    @Input() showHeader: boolean = true;
    @Input() marginBottomOuter: number;
}
