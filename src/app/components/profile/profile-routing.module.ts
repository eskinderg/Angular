import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: ProfileComponent, canActivate: [AuthGuardService] }])],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
