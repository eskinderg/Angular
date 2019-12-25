import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ba-card',
  templateUrl: './baCard.component.html',
  styleUrls: ['baCard.component.scss']
})
export class BaCardComponent {
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Input() header: String;
  @Input() footer: String;
  @Input() scrollBar: boolean;
  @Input() margin: number;
}
