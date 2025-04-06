import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Output,
    Input,
    ElementRef,
    Renderer2,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { DialogButtons } from './buttons.enum';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    @Input() title: string;
    @Input() message: string;
    @Input() buttons: DialogButtons.YES_NO | DialogButtons.CANCEL_ONLY = DialogButtons.YES_NO;

    @Output() closed = new EventEmitter<boolean | null>();

    private escListener?: () => void;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        // Listen for ESC key
        this.escListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close(null);
            }
        });

        // Auto focus dialog
        const dialogElement = this.elRef.nativeElement.querySelector('.dialog');
        dialogElement?.focus();
    }

    ngOnDestroy() {
        // Clean up listener
        if (this.escListener) this.escListener();
    }

    close(result: boolean | null) {
        this.closed.emit(result);
    }

    onBackdropClick() {
        this.close(null);
    }
}
