import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  forwardRef,
  Renderer2,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, filter, debounceTime, distinctUntilChanged, tap } from 'rxjs';

import { Note } from "../../../models/note";

export const EPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};

@Component({
  selector: 'app-textarea-expanded',
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],
  templateUrl: 'textAreaExpanded.component.html',
  styleUrls: ['textAreaExpanded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaExpandedComponent implements ControlValueAccessor, OnInit {

  @ViewChild('textarea', { static: true }) private textarea: ElementRef;

  @Input() textData: string;
  @Input() note: Note;
  @Output() onChange = new EventEmitter(false);
  @Output() onTouched = new EventEmitter(false);
  @Output() onTextChanged = new EventEmitter(false);

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    fromEvent(this.textarea.nativeElement, 'input')
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

  writeValue(value: string): void {
    const div = this.textarea.nativeElement;
    this.renderer.setProperty(div, 'innerHTML', value);
  }

  registerOnChange(fn: any): void {
    // alert('registerOnChange')
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // alert('registerOnTouched')
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const div = this.textarea.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  // change($event) {

    // console.log(this.textData + $event.data);
    // console.log($event);
    // this.onChange.emit($event);
    // this.onTextChanged.emit($event.target.textContent);
    // console.log($event.target.innerHTML)

    // console.log($event.target.innerText);
    // this.onTextChanged.emit({ ...this.note, text: $event.target.innerHTML });
    // console.log(this.note.text)

    // this.onChange($event.target.textContent);
    // this.onTouched($event.target.textContent);
  // }
}
