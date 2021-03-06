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

export const EPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};

@Component({
  selector: 'app-textarea-expanded',
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],
  template: `
  <div contenteditable="true"
      #textarea
      tabindex="1"
      (input)="change($event)"
  >
  </div>
  `,
  styles: [`
    div {
        border-left: 1px solid lightgrey;
        border-right: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
        min-height:150px;
        padding:5px;
    }
    div.disabled {
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
    }
    `]
})
export class TextareaExpandedComponent implements ControlValueAccessor, OnInit {

  @ViewChild('textarea') private textarea: ElementRef;

  @Input() textData: string;
  @Output() onChange = new EventEmitter(false);
  @Output() onTouched = new EventEmitter(false);

  constructor( private renderer: Renderer2 ) { }

  ngOnInit() {
    // this.change(this.textData);
    // this.textData= this.textarea.nativeElement.value;
    // this.writeValue(this.textData);
  }

  writeValue( value: any ): void {
    const div = this.textarea.nativeElement;
    this.renderer.setProperty(div, 'textContent', value);
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
    console.log($event);
    // this.onChange.emit($event);
    // this.onChange($event.target.textContent);
    // this.onTouched($event.target.textContent);
  }
}
