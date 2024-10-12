import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { authGuard } from '../shared/services/auth/auth-guard.service';

export const profileRoutes: Routes = [{ path: '', component: ProfileComponent, canActivate: [authGuard] }];
