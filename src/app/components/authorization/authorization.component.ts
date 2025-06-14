import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// import * as AuthActions from '../../actions/auth';
import * as fromRoot from '../../store/reducers';
/**
 * Class representing authorization endpoint for the client
 */
@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AuthorizationComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);
    private store = inject<Store<fromRoot.IAppState>>(Store);

    /**
     * Invoked during class initialization and redirects the user
     */
    ngOnInit() {
        from(this.authService.mgr.signinRedirectCallback()).subscribe(
            (user) => {
                this.authService.userLoadededEvent.emit(user); // Notifying User has loggedIn Successfully
                // this.store.dispatch(new AuthActions.loginEventSuccess(user));
                this.router.navigate(['/']);
            },
            (error) => {
                console.log(error);
                this.router.navigate(['/404']);
            }
        );
    }
}
