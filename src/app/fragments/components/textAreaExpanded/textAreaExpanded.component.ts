import { Component, OnInit, Output, EventEmitter, ElementRef, forwardRef, Renderer2, ViewChild, ChangeDetectionStrategy, OnDestroy, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class TextareaExpandedComponent implements OnDestroy, OnInit, OnChanges {

  @Input() note: Note;
  subscription: Subscription | undefined;

  @ViewChild('textarea', { static: true }) public textarea: ElementRef;
  @Output() onTextChanged = new EventEmitter(false);
  @Output() onUpdatedOpendNote = new EventEmitter(false);
  @Output() onSelectionChange = new EventEmitter<Note>(false);

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("focusout", ["$event.target.value"])
  onFocusOut(_value: any) {

    this.onSelectionChange.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML, selection: JSON.stringify(this.saveSelection(this.textarea.nativeElement)) } as Note)
    this.onUpdatedOpendNote.emit({ ...this.note, text: this.textarea.nativeElement.innerHTML } as Note);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (
      ((changes['note'].currentValue as Note).id === this.note.id) &&
      (this.note.selection !== null) &&
      ((changes['note'].currentValue as Note).id !== (changes['note'].previousValue as Note)?.id)
    ) {
      setTimeout(() => {
        this.doRestore();
      }, 100)
    }
  }

  private saveSelection(containerEl: any) {
    var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length
    }
  };

  private restoreSelection(containerEl: any, savedSel: any) {
    var charIndex = 0, range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl], node: any, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
        var nextCharIndex = charIndex + node.length;
        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private doRestore() {
    if (this.note.selection) {
      this.restoreSelection(this.textarea.nativeElement, JSON.parse(this.note.selection));
    }
  }

}
