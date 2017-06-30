import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'add-button',
  templateUrl: 'add.button.component.html',
  styleUrls: ['add.button.component.scss'],
  // directives: [NgClass]
})
export class AddButtonComponent {
  @Input() colour: string;
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  onClick($event) {
    $event.preventDefault();
    this.add.emit(this.colour);
  }
}
