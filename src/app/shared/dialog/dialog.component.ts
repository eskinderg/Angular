import {
    Component,
    EventEmitter,
    Output,
    Input,
    ElementRef,
    Renderer2,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy,
    inject
} from '@angular/core';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from './dialog.enum';
import { SvgIconComponent } from 'src/app/components/shared/svg/svg.component';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    host: {
        '[attr.animate.leave]': `'back-drop-leave'` // Bind the 'fade-out' class
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SvgIconComponent]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    private elRef = inject(ElementRef);
    private renderer = inject(Renderer2);

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
