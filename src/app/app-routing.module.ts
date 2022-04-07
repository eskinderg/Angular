import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: ()=>import('./components/home/home.module').then(m=>m.HomeModule) },
      { path: 'profile', loadChildren: ()=>import('./components/profile/profile.module').then(m=>m.ProfileModule)},
      { path: 'about', loadChildren: ()=>import('./components/about/about.module').then(m=>m.AboutModule)},
      { path: 'notes', loadChildren: ()=>import('./components/notes/notes.module').then(m=>m.NotesModule)},
      { path: 'wizard', loadChildren:()=>import('./components/wizard/wizardmanager.module').then(m=>m.WizardManagerModule) },
      { path: 'login', loadChildren: ()=>import('./components/login/login.module').then(m=>m.LoginModule)},
      { path: 'movies', loadChildren: ()=>import('./components/movies/movies.module').then(m=>m.MoviesModule) },
      { path: 'events', loadChildren: ()=>import('./components/events/events.module').then(m=>m.EventsModule) }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
