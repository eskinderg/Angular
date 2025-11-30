import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutNoteListItem } from 'src/app/components/shared/animations/fadeInAndOutNoteListItem';
import { Note } from 'src/app/models/note';
import { DatePipe } from '@angular/common';
import { TooltipDirective } from '../../../../../fragments/components/tooltip/tooltip.directive';
import { NoteTitleTruncatePipe } from '../../../../movies/directives/noteTitleTruncate';
import { AgoDatePipe } from '../../../../movies/directives/dateagopipe';
import { SvgIconComponent } from 'src/app/components/shared/svg/svg.component';

type Animate = {
    note: boolean;
    date: boolean;
};

@Component({
    selector: 'app-note-list-item',
    templateUrl: './note-list-item.component.html',
    animations: [FadeInOutNoteListItem],
    styleUrls: ['./note-list-item.component.scss', '../../../scss/notes.colour.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TooltipDirective, SvgIconComponent, DatePipe, NoteTitleTruncatePipe, AgoDatePipe]
})
export class NoteListItemComponent {
    @Input() note: Note;
    @Input() animate: Animate;
    @Input() selectedNote: Note;

    @Output() archiveNote = new EventEmitter<Note>();
    @Output() updateNote = new EventEmitter<Note>();
    @Output() selectNote = new EventEmitter<Note>();
    @Output() syncNote = new EventEmitter<Note>();

    onSelectNote(note: Note) {
        this.selectNote.emit(note);
    }

    onArchiveNote(note: Note) {
        this.archiveNote.emit(note);
    }

    updatePinOrder(note: Note) {
        this.updateNote.emit({ ...note, pinned: !note.pinned, pin_order: new Date().getTime() });
    }

    onSyncNote() {
        this.syncNote.emit();
    }

    onSpellCheckToggle(note: Note) {
        this.updateNote.emit({ ...note, spell_check: !note.spell_check });
    }
}
