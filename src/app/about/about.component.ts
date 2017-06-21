import { Component } from '@angular/core';
import { SlideAnimation }   from '../shared/animations';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [ SlideAnimation ],
  host: { '[@routerAnimation]': '' }
})
export class AboutComponent { }
