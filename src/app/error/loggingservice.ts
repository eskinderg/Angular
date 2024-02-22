import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

// const API_URL = environment.TODO_API;

@Injectable()
export class LoggingService {
  public onError: EventEmitter<string> = new EventEmitter();

  constructor() {}

  error(error: any) {
    this.onError.emit(error);
  }
  // public updateTodo(todo: Todo): Observable<Todo> {
  //   return this.http
  //     .put(API_URL + '/todos/' + todo.id, todo)
  //     .map(response => {
  //       return new Todo(response.json());
  //     })
  //     .catch(this.handleError);
  // }
  //
  // public deleteTodoById(todoId: number): Observable<null> {
  //   return this.http
  //     .delete(API_URL + '/todos/' + todoId)
  //     .map(response => null)
  //     .catch(this.handleError);
  // }
  //
  // private handleError (error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   return Observable.throw(error);
  // }
}
