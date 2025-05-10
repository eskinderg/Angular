import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'Angular', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./components/home/home.routes').then((r) => r.homeRoutes)
    },
    {
        path: 'profile',
        loadChildren: () => import('./components/profile/profile-routing.module').then((r) => r.profileRoutes)
    },
    {
        path: 'about',
        loadChildren: () => import('./components/about/about-routing.module').then((r) => r.aboutRoutes)
    },
    {
        path: 'notes',
        loadChildren: () => import('./components/notes/notes-routing.module').then((r) => r.notesRoutes)
    },
    {
        path: 'wizard',
        loadChildren: () => import('./components/wizard/wizard-route.module').then((r) => r.wizardRoutes)
    },
    {
        path: 'login',
        loadChildren: () => import('./components/login/login-routing.module').then((r) => r.loginRoutes)
    },
    {
        path: 'movies',
        loadChildren: () => import('./components/movies/movies-routing.module').then((r) => r.moviesRoutes)
    },
    {
        path: 'events',
        loadChildren: () => import('./components/events/events-routing.module').then((r) => r.eventsRoutes)
    }
];
