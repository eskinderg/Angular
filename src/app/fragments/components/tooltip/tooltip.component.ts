import { Component } from '@angular/core';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: true,
    imports: [NgClass]
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
