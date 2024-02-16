import { Component, Input, ChangeDetectionStrategy, forwardRef, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { Note } from "../../../models/note";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-note-text',
  templateUrl: 'note.text.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoteTextComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteTextComponent implements ControlValueAccessor {

  @ViewChild('textarea', { static: true }) private textarea: ElementRef;
  @Input() note: Note;
  textData: string;

  constructor(private renderer: Renderer2) {

  }

  writeValue(value: string): void {
    // const div = this.textarea.nativeElement;
    // this.renderer.setProperty(div, 'innerHTML', value);
    this.textData = value;
  }

  onChange: any = () => {
    alert('asdf')
  }
  onTouch: any = () => {
    alert('asdf')
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // alert('d')
    // const div = this.textarea.nativeElement;
    // const action = isDisabled ? 'addClass' : 'removeClass';
    // this.renderer[action](div, 'disabled');
  }

}
