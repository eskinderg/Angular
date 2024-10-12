import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-check-mark',
    templateUrl: 'checkmark.component.html',
    styleUrls: ['checkmark.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass]
})
export class CheckMarkComponent {
    @Input() checked: boolean = false;

    @Output() selectValue: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click', ['$event.target'])
    onClick() {
        this.checked = !this.checked;
        this.selectValue.emit(this.checked);
    }
}
