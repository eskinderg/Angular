import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    Renderer2,
    inject
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Note } from 'src/app/models/note';

export type Colour = { name: string };

export const Colours: Colour[] = [
    { name: 'red' },
    { name: 'green' },
    { name: 'yellow' },
    { name: 'violet' },
    { name: 'blue' },
    { name: null }
];

export const NOTE_COLOUR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoteColourSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-note-colour-selector',
    templateUrl: './note.colour.selector.component.html',
    styleUrls: ['./note.colour.selector.component.scss', '../../../../scss/notes.colour.scss'],
    providers: [NOTE_COLOUR_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class NoteColourSelectorComponent implements ControlValueAccessor {
    private renderer = inject(Renderer2);
    private el = inject(ElementRef);

    @Input() note: Note;
    @Output() noteColourUpdate = new EventEmitter(false);

    onChange: any = () => {};
    onTouched: any = () => {};
    writeValue(_value: string): void {
        // alert(_value);
        // const btnColourElement = (<HTMLElement>this.el.nativeElement).querySelector('.c');
        // console.log(btnColourElement)
        // console.log(this.el)
        // this.renderer.addClass(btnColourElement, 'active');
        // this.note.colour = _value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        // alert('registerOnTouched')
        this.onTouched = fn;
    }

    setDisabledState?(_isDisabled: boolean): void {}

    onClick(event: any, colour: Colour) {
        this.noteColourUpdate.emit(colour);
        this.onChange(colour.name);
        this.adjustClass(event, 'active');
    }

    get Colours(): Colour[] {
        return Colours;
    }

    adjustClass(event: any, className: string) {
        const btnColourElement = (<HTMLElement>this.el.nativeElement).querySelector(`.active`);
        // console.log(btnColourElement);
        if (btnColourElement) this.renderer.removeClass(btnColourElement, 'active');

        this.renderer.addClass(event.target, className);
        // const hasClass = event.target.classList.contains(className);

        // if (hasClass) {
        //     this.renderer.removeClass(event.target, className);
        // } else {
        //     this.renderer.addClass(event.target, className);
        // }
    }
}
