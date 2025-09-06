import { trigger, transition, style, animate } from '@angular/animations';

export const MovieCardComponentAnimations = [
    trigger('movieCardItem', [
        transition(':enter', [
            style({ opacity: 0, transform: 'scale(0.7) translateY(20px)' }),
            animate(
                '500ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                style({ opacity: 1, transform: 'scale(1) translateY(0)' })
            )
        ]),
        transition(':leave', [
            animate('400ms ease', style({ opacity: 0, transform: 'scale(0.9) translateY(-20px)' }))
        ])
    ])
];
