import { Component, OnInit, Output, EventEmitter, ElementRef, forwardRef, Renderer2, ViewChild, ChangeDetectionStrategy, OnDestroy, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fromEvent, filter, debounceTime, distinctUntilChanged, tap, Subscription } from 'rxjs';
import { Note } from 'src/app/models/note';
import { TextSelection } from './text.selection';

export const EXPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};

@Component({
  selector: 'app-textarea-expanded',
  providers: [EXPANDED_TEXTAREA_VALUE_ACCESSOR],
  templateUrl: 'textAreaExpanded.component.html',
  styleUrls: ['textAreaExpanded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaExpandedComponent implements OnDestroy, OnInit, OnChanges {

  @Input() note: Note;
  subscription: Subscription | undefined;

  @ViewChild('textarea', { static: true }) public textarea: ElementRef;
  @Output() onTextChanged = new EventEmitter(false);
  @Output() onUpdatedOpendNote = new EventEmitter(false);
  @Output() onSelectionChange = new EventEmitter<Note>(false);

  constructor(public htmlSafe: DomSanitizer, private txtSelection: TextSelection) { }

  ngOnInit() {

    this.subscription = fromEvent(this.textarea.nativeElement, 'input')
      .pipe(
        filter(Boolean),
        debounceTime(450),
        distinctUntilChanged(),
        tap(() => {
          this.onTextChanged.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML } as Note);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("focusout", ["$event.target"])
  onFocusOut(target: any) {
    this.onSelectionChange.emit({ ...this.note, text: target.innerHTML, selection: JSON.stringify(this.txtSelection.saveSelection(target)) } as Note)
    this.onUpdatedOpendNote.emit({ ...this.note, text: target.innerHTML, selection: JSON.stringify(this.txtSelection.saveSelection(target)) } as Note);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (
      ((changes['note'].currentValue as Note).id === this.note.id) &&
      (this.note.selection !== null) &&
      ((changes['note'].currentValue as Note).id !== (changes['note'].previousValue as Note)?.id)
    ) {
      setTimeout(() => {
        this.txtSelection.doRestore(this.note.selection, this.textarea.nativeElement);
      }, 100)
    }
  }

}
