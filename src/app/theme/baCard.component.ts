import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ba-card',
  templateUrl: './baCard.html',
  styleUrls: ['bacard.component.scss']
})
export class BaCard {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType:String;
  @Input() header:String;
}
