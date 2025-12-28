import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    viewChild
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-theme-option',
    templateUrl: './appThemeOption.component.html',
    styleUrls: ['appThemeOption.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThemeOptionComponent),
            multi: true
        }
    ],
    imports: [NgClass]
})
export class ThemeOptionComponent implements ControlValueAccessor {
    toggleOption = viewChild.required<ElementRef>('toggleOption');
    @Input() darkMode: string;
    @Output() themeToggleDark: EventEmitter<boolean> = new EventEmitter();
    @Input() label: string;

    value: boolean = false;

    onChange: any = (value: any) => {
        this.darkMode = value.toString();
    };
    onTouched: any = () => {};

    toggle() {
        (this.toggleOption().nativeElement as HTMLInputElement).blur();
        this.value = !this.value;
        this.darkMode = this.value.toString();
        this.onChange(this.value);
        this.onTouched();
        this.themeToggleDark.emit();
    }

    get DarkMode(): boolean {
        return JSON.parse(this.darkMode);
    }

    writeValue(value: boolean): void {
        // this.value = value;
        if (value !== undefined) {
            this.value = value;
            this.darkMode = this.value.toString();
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(_isDisabled: boolean): void {}
}
