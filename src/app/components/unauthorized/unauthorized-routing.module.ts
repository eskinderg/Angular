import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule {}
