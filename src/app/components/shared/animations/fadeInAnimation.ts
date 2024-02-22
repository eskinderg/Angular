import { trigger } from '@angular/animations';

export const fadeInAnimation = trigger('routerFadeInAnimation', [
  // route 'enter' transition
  // state('*', style({position:'relative'}) ),
  // transition(':enter', [
  //   // styles at start of transition
  //   style({ opacity: 0 }),
  //   // animation and styles at end of transition
  //   animate('0.25s ease-in-out', style({ opacity: 1 }))
  // ]),
]);
