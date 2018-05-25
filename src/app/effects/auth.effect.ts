
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { from, of,Observable, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged,switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as  AuthActions from '../actions/auth';
// import { NotesDataService } from '../components/notes/services/notes.data.service';

import { AuthService } from '../components/shared/services/auth/auth.service';







@Injectable()
export class AuthEffect {

  // @Effect()
  // login = this.actions$
  //   .ofType(AuthActions.LOGIN_EVENT)
  //   .switchMap((action: AuthActions.loginEvent) => {
  //     console.log( 'yep something' )
  //     return Observable.fromPromise(<Promise<any>>this.authService.mgr.signoutRedirect())
  //       .switchMap((result) => {
  //         return Observable.of(AuthActions.LOGIN_EVENT_FAIL);
  //          // return Observable.of({})
  //       })
  //   });

  @Effect({ dispatch: false })
  login = this.actions$
    .ofType(AuthActions.LOGIN_EVENT)
    .pipe(
      switchMap((action: AuthActions.loginEvent) =>
        from(this.authService.mgr.signinRedirect())
        .pipe(
          map(data => new AuthActions.loginEventSuccess(data)),
          catchError(err => of(new AuthActions.loginEventFail(err)))
        )
      )
    );

  // @Effect()
  // loginSuccess = this.actions$
  //   .ofType(AuthActions.LOGIN_EVENT_SUCCESS)
  //   .switchMap((action: AuthActions.loginEventSuccess) =>
  //     Observable.fromPromise(this.authService.mgr.signinRedirect())
  //     .map(data => new AuthActions.loginEventSuccess(data))
  //     .catch(err => Observable.of(new AuthActions.loginEventFail(err)))
  //   );

  // @Effect()
  // logout = this.actions$
  //   .ofType(AuthActions.LOGIN_EVENT)
  //   .switchMap((action: AuthActions.loginEvent) =>
  //     Observable.fromPromise(this.authService.mgr.signinRedirect())
  //     .map(data => new AuthActions.loginEventSuccess(data))
  //     .catch(err => Observable.of(new AuthActions.loginEventFail(err)))
  //   );



  // @Effect()
  // updateNoteText: Observable<Action> = this.actions$
  //   .ofType(NotesActions.UPDATE_NOTE_TEXT)
  //   .switchMap((action: NotesActions.updateNoteText) =>
  //     this.notesApiService.addNote(action.payload)
  //     .map(note => new NotesActions.updateNoteTextSuccess(note))
  //     .catch(err => Observable.of(new NotesActions.updateNoteTextFail(err)))
  //   );

  // @Effect()
  // updateNotePosition: Observable<Action> = this.actions$
  //   .ofType(NotesActions.UPDATE_NOTE_POSITION)
  //   .switchMap((action: NotesActions.updateNotePosition) =>
  //     this.notesApiService.addNote(action.payload)
  //     .map(note => new NotesActions.updateNotePositionSuccess(note))
  //     .catch(err => Observable.of(new NotesActions.updateNotePositionFail(err)))
  //   );

  // @Effect()
  // updateNoteSize: Observable<Action> = this.actions$
  //   .ofType(NotesActions.UPDATE_NOTE_SIZE)
  //   .switchMap((action: NotesActions.updateNoteSize) =>
  //     this.notesApiService.addNote(action.payload)
  //     .map(note => new NotesActions.updateNoteSizeSuccess(note))
  //     .catch(err => Observable.of(new NotesActions.updateNoteSizeFail(err)))
  //   );

  // @Effect()
  // update: Observable<Action> = this.actions$
  //   .ofType(NotesActions.UPDATE_NOTE)
  //   .switchMap((action: NotesActions.updateNote) =>
  //     this.notesApiService.addNote(action.payload)
  //     .map(note => new NotesActions.updateNoteSuccess(note))
  //     .catch(err => Observable.of(new NotesActions.createNoteFail(err)))
  //   );

  // @Effect()
  // fetch: Observable<Action> = this.actions$
  //   .ofType(NotesActions.FETCH_NOTES)
  //   .switchMap(() => this.notesApiService.getNotes()
  //     .map(notes => new NotesActions.fetchNotesSuccess(notes))
  //     .catch(err => Observable.of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err }))
  //   );

  // @Effect()
  // delete = this.actions$
  //   .ofType(NotesActions.DELETE_NOTE)
  //   .switchMap((action: NotesActions.deleteNote) =>
  //     this.notesApiService.deleteNote(action.payload)
  //     .map(note => new NotesActions.deleteNoteSuccess(note))
  //     .catch(err => Observable.of(new NotesActions.deleteNoteFail(err)))
  //   );


  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private authService: AuthService) { }


}
