import {
    AfterContentInit,
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    Injector,
    Input,
    NgZone,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { Observable } from 'rxjs';

import { ToastConfig } from './toast-config';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbToastFadeInTransition, ngbToastFadeOutTransition } from './toast-transition';
import { NgTemplateOutlet } from '@angular/common';

/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
@Directive({ selector: '[appToastDirective]', standalone: true })
export class ToastHeaderDirective {}

/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
@Component({
    selector: 'app-toast',
    exportAs: 'appToast',
    imports: [NgTemplateOutlet],
    host: {
        role: 'alert',
        '[attr.aria-live]': 'ariaLive',
        'aria-atomic': 'true',
        '[class]': 'toast',
        '[class.fade]': 'animation'
    },
    template: `
        <ng-template #headerTpl>
            <strong class="me-auto">{{ header }}</strong>
        </ng-template>
        @if (contentHeaderTpl || header) {
            <div class="toast-header">
                <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl" />

                <svg
                    class="btn-toast-close"
                    width="1.5rem"
                    height="1.5rem"
                    (click)="hide()"
                    viewBox="0 0 24 24"
                    fill="none">
                    <g clip-path="url(#clip0_429_11083)">
                        <path
                            d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                            stroke="#8f8f8f"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath>
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        }
        <div class="toast-body" [class]="cls">
            <ng-content />
        </div>
    `,
    styleUrl: './toast.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements AfterContentInit, OnChanges {
    // ariaLive = inject(new HostAttributeToken('aria-live'));

    private _config = inject(ToastConfig);
    private _zone = inject(NgZone);
    private _injector = inject(Injector);
    private _element = inject(ElementRef);

    private _timeoutID;

    @Input() cls: string = '';

    /**
     * If `true`, toast opening and closing will be animated.
     *
     * Animation is triggered only when the `.hide()` or `.show()` functions are called
     *
     * @since 8.0.0
     */
    @Input() animation = this._config.animation;

    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     */
    @Input() delay = this._config.delay;

    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     */
    @Input() autohide = this._config.autohide;

    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     */
    @Input() header: string;

    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     */
    @ContentChild(ToastHeaderDirective, { read: TemplateRef, static: true })
    contentHeaderTpl: TemplateRef<any> | null = null;

    /**
     * An event fired after the animation triggered by calling `.show()` method has finished.
     *
     * @since 8.0.0
     */
    @Output() shown = new EventEmitter<void>();

    /**
     * An event fired after the animation triggered by calling `.hide()` method has finished.
     *
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross
     *
     * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
     * to the user to take care of that.
     *
     * @since 8.0.0
     */
    @Output() hidden = new EventEmitter<void>();

    constructor() {
        // this.ariaLive ??= this._config.ariaLive;
    }

    ngAfterContentInit() {
        afterNextRender(
            {
                mixedReadWrite: () => {
                    this._init();
                    this.show();
                }
            },
            { injector: this._injector }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }

    /**
     * Triggers toast closing programmatically.
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(hidden)` output
     *
     * @since 8.0.0
     */
    hide(): Observable<void> {
        this._clearTimeout();
        const transition = ngbRunTransition(
            this._zone,
            this._element.nativeElement,
            ngbToastFadeOutTransition,
            {
                animation: this.animation,
                runningTransition: 'stop'
            }
        );
        transition.subscribe(() => {
            this.hidden.emit();
        });
        return transition;
    }

    /**
     * Triggers toast opening programmatically.
     *
     * The returned observable will emit and be completed once the opening transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(shown)` output
     *
     * @since 8.0.0
     */
    show(): Observable<void> {
        const transition = ngbRunTransition(
            this._zone,
            this._element.nativeElement,
            ngbToastFadeInTransition,
            {
                animation: this.animation,
                runningTransition: 'continue'
            }
        );
        transition.subscribe(() => {
            this.shown.emit();
        });
        return transition;
    }

    private _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }

    private _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
}
