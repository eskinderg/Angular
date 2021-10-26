import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
       (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './components/home/home.module#HomeModule' },
      { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },
      { path: 'about', loadChildren: './components/about/about.module#AboutModule' },
      { path: 'notes', loadChildren: './components/notes/notes.module#NotesModule' },
      { path: 'wizard', loadChildren: './components/wizard/wizardmanager.module#WizardManagerModule' },
      { path: 'login', loadChildren: './components/login/login.module#LoginModule'},
      { path: 'movies', loadChildren: './components/movies/movies.module#MoviesModule' },
      { path: 'events', loadChildren: './components/events/events.module#EventsModule' }
    ], {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
