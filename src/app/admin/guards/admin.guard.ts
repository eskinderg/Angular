import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPermission } from 'src/app/auth/auth.permission.service';

export const adminGuard = () => {
    const authPermission = inject(AuthPermission);
    const router = inject(Router);

    if (authPermission.hasPermission('Admin')) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
