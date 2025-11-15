import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutNoteListItem } from 'src/app/components/shared/animations/fadeInAndOutNoteListItem';
import { Note } from 'src/app/models/note';
import { DatePipe } from '@angular/common';
import { TooltipDirective } from '../../../../../fragments/components/tooltip/tooltip.directive';
import { NoteTitleTruncatePipe } from '../../../../movies/directives/noteTitleTruncate';
import { AgoDatePipe } from '../../../../movies/directives/dateagopipe';

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
    imports: [TooltipDirective, DatePipe, NoteTitleTruncatePipe, AgoDatePipe]
})
export class NoteListItemComponent {
    @Input() note: Note;
    @Input() animate: Animate;
    @Input() selectedNote: Note;
    @Input() isSyncing: boolean;

    @Output() archiveNote = new EventEmitter(false);
    @Output() selectNote = new EventEmitter(false);
    @Output() changeNoteText = new EventEmitter(false);
    @Output() changePineOrder = new EventEmitter(false);
    @Output() syncNote = new EventEmitter(false);

    onSelectNote(note: Note) {
        this.selectNote.emit(note);
    }

    onArchiveNote(note: Note) {
        this.archiveNote.emit(note);
    }

    updatePinOrder(note: Note) {
        this.changePineOrder.emit(note);
    }

    onSyncNote() {
        this.syncNote.emit();
    }
}
