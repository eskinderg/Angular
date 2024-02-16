
import { trigger, animate, transition, style } from '@angular/animations';

export const FadeInOutEventListItem =
trigger('fadeInOutEventListItem', [
  // route 'enter' transition
  // state('*', style({position:'relative'}) ),

  transition(':enter', [
    // styles at start of transition
    style({ opacity: 0 }),
    // animation and styles at end of transition
    animate('1s ease-in-out', style({ opacity: 1 }))
  ]),

  transition(':leave', [
    // styles at start of transition
    style({ opacity: 1 }),
    // animation and styles at end of transition
    animate('1s ease-in-out', style({ opacity: 0 }))
  ]),
]);
