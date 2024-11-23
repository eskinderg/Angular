import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    viewChild
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-theme-option',
    templateUrl: './appThemeOption.component.html',
    styleUrls: ['appThemeOption.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class ThemeOptionComponent {
    toggleOption = viewChild.required<ElementRef>('toggleOption');
    @Input() darkMode: string;
    @Output() themeToggleDark: EventEmitter<boolean> = new EventEmitter();
    @Input() label: string;

    toggle() {
        (this.toggleOption().nativeElement as HTMLInputElement).blur();
        this.themeToggleDark.emit();
    }

    get DarkMode() {
        return JSON.parse(this.darkMode);
    }
}
