import { Component, OnInit, Output, EventEmitter, ElementRef, forwardRef, Renderer2, ViewChild, ChangeDetectionStrategy, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaExpandedComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit {

  note: Note;
  subscription: Subscription | undefined;

  @ViewChild('textarea', { static: true }) public textarea: ElementRef;
  @Output() onTextChanged = new EventEmitter(false);
  @Output() onSelectionChange = new EventEmitter<Selection>(false);

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    this.subscription = fromEvent(this.textarea.nativeElement, 'input')
      .pipe(
        filter(Boolean),
        debounceTime(450),
        distinctUntilChanged(),
        tap(() => {
          this.onTextChanged.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML });
        })
      )
      .subscribe();
  }

  writeValue(_value: Note): void {
    if (_value) {
      this.note = _value
      const div = this.textarea.nativeElement;
      this.renderer.setProperty(div, 'innerHTML', _value.text);
    }
  }

  registerOnChange(fn: any): void {
    // this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const div = this.textarea.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  ngAfterViewInit(): void {
    this.textarea.nativeElement.focus()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("focusout", ["$event.target.value"])
  onBlur(value) {
    this.onSelectionChange.emit(window.getSelection())
    this.textarea.nativeElement.focus()
  }

}
