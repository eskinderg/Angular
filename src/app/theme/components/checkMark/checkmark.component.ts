import { Component, Input } from '@angular/core'
@Component({

  selector: 'check-mark',
  templateUrl: 'checkmark.component.html',
  styleUrls: ['checkmark.component.scss']
})
export class CheckMarkComponent {

  @Input() checked: boolean = false;

  onClick() {
    this.checked = !this.checked;
  }
}
