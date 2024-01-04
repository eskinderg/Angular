import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../../../models/note';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NotesApiService } from '../../services/notes.api.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss']

})
export class NoteComponent implements OnDestroy, OnInit {

  @Input() note: Note;

  @Output() changeNoteText = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);
  @Output() changeNoteSize = new EventEmitter(false);
  @Output() deleteNote = new EventEmitter(false);

  routeSubscription$: Subscription;

  @ViewChild('notediv', { static: true }) textarea: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteApiService: NotesApiService,
  ) {
    this.routeSubscription$ = this.router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof NavigationEnd)
    ).subscribe((routerEvent: RouterEvent) => {
      this.note = this.route.snapshot.data['note']
    })
  }

  ngOnInit() {
    this.note = this.route.snapshot.data['note']
  }

  handleChangeNoteText(updatedNote: Note) {
    this.noteApiService.updateNoteText(updatedNote);
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
  }

}
