import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TodosResolve } from '../shared/components/todo/todo.data.service/TodosResolve';
import { TodoDataService } from '../shared/components/todo/todo.data.service/todo.data.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: {
          todos: TodosResolve
        }
      }
    ])
  ],
  providers: [TodoDataService],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
