import { Component, OnInit, Output, EventEmitter, ElementRef, forwardRef, Renderer2, ViewChild, ChangeDetectionStrategy, OnDestroy, AfterViewInit, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fromEvent, filter, debounceTime, distinctUntilChanged, tap, Subscription } from 'rxjs';
import { Note } from 'src/app/models/note';

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
export class TextareaExpandedComponent implements OnDestroy, OnInit, AfterViewInit {

  @Input() note: Note;
  subscription: Subscription | undefined;

  @ViewChild('textarea', { static: true }) public textarea: ElementRef;
  @Output() onTextChanged = new EventEmitter(false);
  @Output() onUpdatedOpendNote = new EventEmitter(false);

  @Output() onSelectionChange = new EventEmitter<Selection>(false);

  constructor(public htmlSafe: DomSanitizer) { }

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

  ngAfterViewInit(): void {
    this.textarea.nativeElement.focus()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("focusout", ["$event.target.value"])
  onFocusOut(_value: any) {
    this.onUpdatedOpendNote.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML } as Note);
    // this.onSelectionChange.emit(window.getSelection())
    // this.textarea.nativeElement.focus()
  }

}

// @HostListener("focusout", ["$event.target.value"])
// onBlur(_value: any) {
// this.onUpdatedOpendNote.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML } as Note);
// this.onSelectionChange.emit(window.getSelection())
// this.textarea.nativeElement.focus()
// }

// constructor(private renderer: Renderer2) { }

// writeValue(_value: Note): void {
//   if (_value) {
//     // this.note = { ..._value }
//     this.note =  Object.assign({}, _value);
//     const div = this.textarea.nativeElement;
//     this.renderer.setProperty(div, 'innerHTML', this.note.text);
//   }
// }

// registerOnChange(fn: any): void {
//   // this.onChange = fn;
// }

// registerOnTouched(fn: any): void {
//   // this.onTouched = fn;
// }

// setDisabledState(isDisabled: boolean): void {
//   const div = this.textarea.nativeElement;
//   const action = isDisabled ? 'addClass' : 'removeClass';
//   this.renderer[action](div, 'disabled');
// }
