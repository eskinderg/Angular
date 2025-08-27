import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const MovieCardAnimations = [
    trigger('movieCardList', [
        transition('* => *', [
            // initial state
            query(':enter', [style({ opacity: 0, transform: 'scale(0.7) translateY(20px)' })], {
                optional: true
            }),

            // animate entering
            query(
                ':enter',
                [
                    stagger(50, [
                        animate(
                            '500ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                            style({ opacity: 1, transform: 'scale(1) translateY(0)' })
                        )
                    ])
                ],
                { optional: true }
            )
            // animate leaving
            // ,
            // query(
            //     ':leave',
            //     [
            //         stagger(50, [
            //             animate(
            //                 '400ms ease',
            //                 style({ opacity: 0, transform: 'scale(0.9) translateY(-20px)' })
            //             )
            //         ])
            //     ],
            //     { optional: true }
            // )
        ])
    ])
];
