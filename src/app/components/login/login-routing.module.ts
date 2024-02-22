import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: ':endsession', component: LoginComponent }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
