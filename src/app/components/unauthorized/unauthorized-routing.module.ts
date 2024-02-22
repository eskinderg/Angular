import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';

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
