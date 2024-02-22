import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Component transition animations
 */
export const SlideAnimation: AnimationTriggerMetadata = trigger('routerAnimation', [
  // state('void', style({position:'absolute', width:'100%'}) ),
  state('*', style({ position: 'absolute', width: '100%' })),
  transition(':enter', [
    // before 2.1: transition('void => *', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    // before 2.1: transition('* => void', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  ])
]);
