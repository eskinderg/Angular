import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ba-card',
  templateUrl: './baCard.html',
  styleUrls: ['bacard.component.scss']
})
export class BaCardComponent {
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Input() header: String;
  @Input() footer: String;
  @Input() margin: number;
}
