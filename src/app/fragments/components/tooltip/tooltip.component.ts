import { Component } from '@angular/core';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
    position: TooltipPosition = TooltipPosition.LEFT;
    theme: TooltipTheme = TooltipTheme.DEFAULT;
    tooltip = '';
    left = 0;
    top = 0;
    visible = false;

    constructor() {}
}
