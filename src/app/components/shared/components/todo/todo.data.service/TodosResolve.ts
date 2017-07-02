import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TodoDataService } from './todo.data.service';
import { Todo } from '../todo';

@Injectable()
export class TodosResolve implements Resolve<Todo[]> {

  constructor(private todoDataService: TodoDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.todoDataService.getAllTodos();
  }
}