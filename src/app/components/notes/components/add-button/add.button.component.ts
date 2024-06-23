import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-add-button',
    templateUrl: 'add.button.component.html',
    styleUrls: ['add.button.component.scss']
    // directives: [NgClass]
})
export class AddButtonComponent {
    @Input() colour: string | undefined;
    @Output() add: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.add.emit(this.colour);
    }
}
