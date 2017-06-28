import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TodoDataService } from '../todo.data.service/todo.data.service';
import { Todo } from '../todo';

@Component({
  selector: 'todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
  providers: [TodoDataService]
})
export class TodoComponent {

  @Input() todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {
  }

  onAddTodo(todo: Todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo: Todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo: Todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

}
