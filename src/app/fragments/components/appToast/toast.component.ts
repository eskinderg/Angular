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
    @Input() cls: string = ''; // custom class
    @Input() autohide: boolean = true;
    @Input() delay: number = 500;
    @Input() header: string = '';
    @Input() animate: boolean = false;
    @Output() hidden = new EventEmitter<void>();

    private cdr = inject(ChangeDetectorRef);
    private timeoutId: any;
    private removalTimer: any;

    @HostBinding('class.show') isVisible = false;
    @HostBinding('class.animate') get animateClass() {
        return this.animate;
    }

    ngOnInit(): void {
        // Show immediately when created
        this.isVisible = true;

        if (this.autohide) {
            this.timeoutId = setTimeout(() => this.hide(), this.delay);
        }
    }

    hide(): void {
        this.isVisible = false;
        this.cdr.markForCheck();
        this.removalTimer = setTimeout(() => this.hidden.emit(), this.delay);
    }

    ngOnDestroy(): void {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        if (this.removalTimer) clearTimeout(this.removalTimer);
    }
}
