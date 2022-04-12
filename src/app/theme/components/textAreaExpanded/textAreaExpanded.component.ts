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
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  styleUrls: ['textAreaExpanded.component.scss']
})
export class TextareaExpandedComponent implements ControlValueAccessor, OnInit {

  @ViewChild('textarea', {static:true}) private textarea: ElementRef;

  @Input() textData: string;
  @Input() note: Note;
  @Output() onChange = new EventEmitter(false);
  @Output() onTouched = new EventEmitter(false);
  @Output() onTextChanged = new EventEmitter(false);

  constructor( private renderer: Renderer2 ) { }

  ngOnInit() {
    // this.change(this.textData);
    // this.textData= this.textarea.nativeElement.value;
    // this.writeValue(this.textData);
  }

  writeValue( value: string ): void {
    const div = this.textarea.nativeElement;
    this.renderer.setProperty(div, 'textContent', value );
  }

  registerOnChange( fn: any ): void {
    // alert('registerOnChange')
    this.onChange = fn;
  }

  registerOnTouched( fn: any ): void {
    // alert('registerOnTouched')
    this.onTouched = fn;
  }

  setDisabledState( isDisabled: boolean ): void {
    const div = this.textarea.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  change( $event ) {

    // console.log(this.textData + $event.data);
    // console.log($event);
    // this.onChange.emit($event);
    // this.onTextChanged.emit($event.target.textContent);

    // console.log($event.target.innerText);
    this.onTextChanged.emit({...this.note, text: $event.target.innerText});
    // console.log(this.note.text)

    // this.onChange($event.target.textContent);
    // this.onTouched($event.target.textContent);
  }
}
