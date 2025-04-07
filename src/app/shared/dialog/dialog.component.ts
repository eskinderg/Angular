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
import { DIALOG_BUTTONS } from './buttons.enum';
import { DIALOG_RESULT } from './result.enum';

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
    @Input() buttons:
        | DIALOG_BUTTONS.YES_NO
        | DIALOG_BUTTONS.CANCEL_ONLY
        | DIALOG_BUTTONS.OK_ONLY
        | DIALOG_BUTTONS.CLOSE_ONLY = DIALOG_BUTTONS.YES_NO;

    dialogResponse = DIALOG_RESULT;
    dialogButtons = DIALOG_BUTTONS;

    @Output() closed = new EventEmitter<DIALOG_RESULT | null>();

    private escListener?: () => void;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        // Listen for ESC key
        this.escListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close(DIALOG_RESULT.CANCEL);
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

    close(result: DIALOG_RESULT | null) {
        this.closed.emit(result);
    }

    onBackdropClick() {
        this.close(DIALOG_RESULT.CANCEL);
    }
}
