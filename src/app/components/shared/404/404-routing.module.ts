import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './404.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '404',
        component: NotfoundComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotfoundRoutingModule {}
