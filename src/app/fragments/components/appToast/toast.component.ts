import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    HostBinding,
    ChangeDetectionStrategy,
    inject,
    ChangeDetectorRef
} from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() autohide: boolean = true;
    @Input() duration: number = 5000;
    @Input() type: 'success' | 'error' | 'warning' | 'standard' = 'success';
    @Input() header: string = '';
    @Output() hidden = new EventEmitter<void>();

    private cdr = inject(ChangeDetectorRef);
    private _animate = false;
    private timeoutId: any;
    private removalTimer: any;

    @HostBinding('class.show') isVisible = true;

    @Input()
    @HostBinding('class.animate')
    get animate() {
        return this._animate;
    }

    set animate(value: boolean) {
        this._animate = value;
    }

    ngOnInit(): void {
        if (this.autohide) {
            this.timeoutId = setTimeout(() => this.hide(), this.duration);
        }
    }

    hide(): void {
        this.isVisible = false;
        this.cdr.markForCheck();
        this.removalTimer = setTimeout(() => this.hidden.emit(), 300);
    }

    ngOnDestroy(): void {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        if (this.removalTimer) clearTimeout(this.removalTimer);
    }
}
