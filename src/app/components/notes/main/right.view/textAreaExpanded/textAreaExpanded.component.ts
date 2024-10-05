import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    forwardRef,
    ChangeDetectionStrategy,
    OnDestroy,
    Input,
    viewChild,
    SimpleChanges,
    OnChanges,
    HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, filter, debounceTime, distinctUntilChanged, tap, Subscription } from 'rxjs';
import { Note } from 'src/app/models/note';
import { TextSelection } from './text.selection';

export const EXPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaExpandedComponent),
    multi: true
};

@Component({
    selector: 'app-textarea-expanded',
    providers: [EXPANDED_TEXTAREA_VALUE_ACCESSOR],
    templateUrl: 'textAreaExpanded.component.html',
    styleUrls: ['textAreaExpanded.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaExpandedComponent implements OnDestroy, OnInit, OnChanges {
    @Input() note: Note;
    @Input() facadeNote: Note;
    subscription: Subscription | undefined;

    textAreaElementRef = viewChild.required<ElementRef>('textAreaElementRef');

    @Output() textAreaTextChanged = new EventEmitter(false);
    @Output() textAreaUpdatedOpendNote = new EventEmitter(false);
    @Output() textAreaSelectionChange = new EventEmitter<Note>(false);

    constructor(
        public htmlSafe: DomSanitizer,
        private txtSelection: TextSelection
    ) {}

    ngOnInit() {
        this.subscription = fromEvent(this.textAreaElementRef().nativeElement, 'input')
            .pipe(
                filter(Boolean),
                debounceTime(450),
                distinctUntilChanged(),
                tap(() => {
                    this.textAreaTextChanged.emit({
                        ...this.facadeNote,
                        text: this.textAreaElementRef().nativeElement.innerHTML
                    } as Note);
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('focusout', ['$event.target'])
    onFocusOut(target: any) {
        const currentSelection: string = JSON.stringify(this.txtSelection.saveSelection(target));

        if (currentSelection != this.facadeNote.selection) {
            this.textAreaSelectionChange.emit({
                ...this.facadeNote,
                text: target.innerHTML,
                selection: currentSelection
            } as Note);
            this.textAreaUpdatedOpendNote.emit({
                ...this.facadeNote,
                text: target.innerHTML,
                selection: currentSelection
            } as Note);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            (changes['facadeNote'].currentValue as Note).id === this.facadeNote.id &&
            this.facadeNote.selection !== null &&
            (changes['facadeNote'].currentValue as Note).id !==
                (changes['facadeNote'].previousValue as Note)?.id
        ) {
            setTimeout(() => {
                this.txtSelection.doRestore(
                    this.facadeNote.selection,
                    this.textAreaElementRef().nativeElement
                );
            }, 100);
        }
    }
}
