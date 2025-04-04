import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-add-button',
    templateUrl: 'add.button.component.html',
    styleUrls: ['add.button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // directives: [NgClass]
    standalone: true,
    imports: [NgClass]
})
export class AddButtonComponent {
    @Input() colour: string | undefined;
    @Output() add: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.add.emit(this.colour);
    }
}
