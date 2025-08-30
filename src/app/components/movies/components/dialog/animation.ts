import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const DialogAnimations = {
    modal: trigger('modal', [
        transition(':enter', [
            animate(
                '500ms cubic-bezier(0, 0, 0, 1)',
                keyframes([
                    style({ opacity: 1, transform: 'scale(0.7) translateY(-20px)', offset: 0 }),
                    style({ opacity: 1, transform: 'scale(1.1) translateY(0)', offset: 0.1 }),
                    style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 })
                ])
            )
        ]),
        transition(':leave', [
            animate(
                '250ms cubic-bezier(0.4, 0.0, 1, 1)',
                style({ opacity: 0, transform: 'scale(0.95) translateY(-20px)' })
            )
        ])
    ])
};
