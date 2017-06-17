import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
  // providers: [TodoDataService]
})
export class HomeComponent  {

// todos: Todo[] = [];
// data: any = [];
// tableData: any[]=[];
//
//   constructor(private todoDataService: TodoDataService) {
//   }
//
//   public ngOnInit() {
//     this.todoDataService
//       .getAllTodos()
//       .subscribe(
//         (todos) => {
//           this.todos = todos;
//         }
//       );
//
// // this.tableData = [
// //   {"Name":"eskinder", "Age": "30"},
// //   {"Name":"getahun", "Age": "60"}
// // ];
//
//   }
//
//   onAddTodo(todo:Todo) {
//     this.todoDataService
//       .addTodo(todo)
//       .subscribe(
//         (newTodo) => {
//           this.todos = this.todos.concat(newTodo);
//         }
//       );
//   }
//
//   onToggleTodoComplete(todo:Todo) {
//     this.todoDataService
//       .toggleTodoComplete(todo)
//       .subscribe(
//         (updatedTodo) => {
//           todo = updatedTodo;
//         }
//       );
//   }
//
//   onRemoveTodo(todo:Todo) {
//     this.todoDataService
//       .deleteTodoById(todo.id)
//       .subscribe(
//         (_) => {
//           this.todos = this.todos.filter((t) => t.id !== todo.id);
//         }
//       );
// }

}
