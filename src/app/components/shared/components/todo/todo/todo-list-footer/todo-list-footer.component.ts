import { Component, Input } from '@angular/core';
import { Todo } from '../../todo';

@Component({
  moduleId: module.id,
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.scss']
})
export class TodoListFooterComponent {

  @Input()
  todos: Todo[];

  constructor() {
  }

}
