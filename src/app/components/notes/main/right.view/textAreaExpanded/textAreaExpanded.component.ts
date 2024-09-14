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
    viewChild
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
export class TextareaExpandedComponent implements OnDestroy, OnInit {
    @Input() note: Note;
    @Input() facadeNote: Note;
    subscription: Subscription | undefined;

    textAreaElementRef = viewChild.required<ElementRef>('textAreaElementRef');
    lastModified: Date;

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
                    const date = new Date();
                    const offset = date.getTimezoneOffset();
                    this.lastModified = new Date(date.getTime() - offset * 60 * 1000);

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

    // @HostListener('focusout', ['$event.target'])
    // onFocusOut(target: any) {
    // this.textAreaSelectionChange.emit({
    //     ...this.note,
    //     dateModified: this.lastModified ? this.lastModified : this.note.dateModified,
    //     text: target.innerHTML,
    //     selection: JSON.stringify(this.txtSelection.saveSelection(target))
    // } as Note);
    // this.textAreaUpdatedOpendNote.emit({
    //     ...this.note,
    //     text: target.innerHTML,
    //     selection: JSON.stringify(this.txtSelection.saveSelection(target))
    // } as Note);
    // }

    // ngOnChanges(changes: SimpleChanges) {
    // if (
    //     (changes['note'].currentValue as Note).id === this.note.id &&
    //     this.note.selection !== null &&
    //     (changes['note'].currentValue as Note).id !== (changes['note'].previousValue as Note)?.id
    // ) {
    //     setTimeout(() => {
    //         this.txtSelection.doRestore(this.note.selection, this.textAreaElementRef().nativeElement);
    //     }, 100);
    // }
    // }
}
