import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { NotesComponent } from './components/notes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotesComponent,
        canActivate:[AuthGuardService]
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
