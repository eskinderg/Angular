import {Component, Input} from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
  styleUrls: ['bacard.component.scss']
})
export class BaCard {
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Input() header: String;
  @Input() footer: String;
}
