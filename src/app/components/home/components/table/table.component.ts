
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../shared/components/todo/todo';

@Component(
  {
    moduleId: module.id,
    selector: 'table-todo-list',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
  }
)
export class TableComponent {

  @Input()
  todos: Todo[];

  @Input()
  title: string;

  // @Output()
  // remove: EventEmitter<Todo> = new EventEmitter();

  // @Output()
  // toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }

  // onToggleTodoComplete(todo: Todo) {
  //   this.toggleComplete.emit(todo);
  // }
  //
  // onRemoveTodo(todo: Todo) {
  //   this.remove.emit(todo);
  // }

}
