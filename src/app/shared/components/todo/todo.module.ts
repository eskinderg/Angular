import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoApiService } from './todo.data.service/todo.api.service';

import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoListHeaderComponent } from './todo/todo-list-header/todo-list-header.component';
import { TodoListItemComponent } from './todo/todo-list-item/todo-list-item.component';
import { TodoListFooterComponent} from './todo/todo-list-footer/todo-list-footer.component';

import { TodosResolve } from './todo.data.service/TodosResolve';

// import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [FormsModule,CommonModule ],
  declarations: [
      TodoComponent,
      TodoListHeaderComponent,
      TodoListItemComponent,
      TodoListFooterComponent,
      TodoListComponent
    ],
  exports: [
    TodoComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
    TodoListFooterComponent,
    TodoListComponent,
    CommonModule,
    FormsModule
  ],
  providers: [TodoApiService, TodosResolve]
})
export class TodoModule { }
