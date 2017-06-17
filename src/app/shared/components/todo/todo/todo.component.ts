import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoDataService } from '../todo.data.service/todo.data.service';
import { Todo } from '../todo';

@Component({
  selector: 'todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
  providers: [TodoDataService]
})
export class TodoComponent implements OnInit {

todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {
  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );

  }

  onAddTodo(todo:Todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo:Todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo:Todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

}
