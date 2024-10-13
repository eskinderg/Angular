import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { authGuard } from '../../auth/auth.guard';

export const profileRoutes: Routes = [{ path: '', component: ProfileComponent, canActivate: [authGuard] }];
