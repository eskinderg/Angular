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
import { DIALOG_TYPE } from './buttons.enum';
import { DIALOG_RESPONSE } from './response.enum';
import { DIALOG_SIGNS } from './dialog.sign.enum';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    @Input() title: string;
    @Input() message: string;
    @Input() dialogType:
        | DIALOG_TYPE.YES_NO
        | DIALOG_TYPE.CANCEL_ONLY
        | DIALOG_TYPE.OK_ONLY
        | DIALOG_TYPE.CLOSE_ONLY = DIALOG_TYPE.YES_NO;
    @Input() showBackDrop: boolean = true;
    @Input() sign: DIALOG_SIGNS.WARNING | DIALOG_SIGNS.INFO | null;

    dialogResponse = DIALOG_RESPONSE;
    dialogTypes = DIALOG_TYPE;
    dialogSigns = DIALOG_SIGNS;

    @Output() closed = new EventEmitter<DIALOG_RESPONSE | null>();

    private escListener?: () => void;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        // Listen for ESC key
        this.escListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close(DIALOG_RESPONSE.CANCEL);
            }
        });

        // Auto focus dialog
        const dialogElement = this.elRef.nativeElement.querySelector('.dialog');
        dialogElement?.focus();
    }

    get imgSrc(): string {
        return DIALOG_SIGNS[this.sign]
            ? `assets/images/${DIALOG_SIGNS[this.sign]}-icon.svg`.toLowerCase()
            : null;
    }

    ngOnDestroy() {
        // Clean up listener
        if (this.escListener) this.escListener();
    }

    close(response: DIALOG_RESPONSE | null) {
        this.closed.emit(response);
    }

    onBackdropClick() {
        this.close(DIALOG_RESPONSE.CANCEL);
    }
}
