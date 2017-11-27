import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },
      { path: 'about', loadChildren: './components/about/about.module#AboutModule' },
      { path: 'notes', loadChildren: './components/notes/notes.module#NotesModule' },
      { path: 'wizard', loadChildren: './components/wizard/wizardmanager.module#WizardManagerModule' },
      { path: 'movies', loadChildren: './components/movies/movies.module#MoviesModule' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
