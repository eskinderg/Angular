import { AnimationTriggerMetadata, animate, style, transition, trigger } from '@angular/animations';

export function FadeInOut(
    timingIn: number,
    timingOut: number,
    height: boolean = false
): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
        transition(':enter', [
            style(height ? { opacity: 0, height: 0 } : { opacity: 0 }),
            animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1 }))
        ]),
        transition(':leave', [animate(timingOut, style(height ? { opacity: 0, height: 0 } : { opacity: 0 }))])
    ]);
}

export function FadeIn(timingIn: number, height: boolean = false): AnimationTriggerMetadata {
    return trigger('fadeIn', [
        transition(':enter', [
            style(height ? { opacity: 0, height: 0 } : { opacity: 0 }),
            animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1 }))
        ])
    ]);
}
