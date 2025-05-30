import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '../../store/reducers';
import * as AuthActions from '../../store/actions/auth.action';
import { OAuthService } from 'angular-oauth2-oidc';
import {
    Validators,
    UntypedFormGroup,
    UntypedFormControl,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { passwordFlowAuthConfig } from 'src/app/auth/auth.config';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
    @HostBinding('@routerFadeInAnimation')
    userProfile: object;
    loginForm: UntypedFormGroup;
    message$ = new BehaviorSubject<string>('');

    showPassword = false;

    constructor(
        private store: Store<fromRoot.IAppState>,
        private oauthService: OAuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // this.route.params.subscribe((params) => (this.message = params['endsession']));

        if (this.oauthService.hasValidAccessToken()) {
            this.router.navigate(['/home']);
            // return
        }
    }

    ngOnInit() {
        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
        // this.loginForm = this.formBuilder.group({
        //   username: ['', Validators.required ],
        //   password: ['', Validators.required ]
        // })
    }

    loadUserProfile(): void {
        this.oauthService.loadUserProfile().then((up) => (this.userProfile = up));
    }

    // hasMessage(): boolean {
    //     return this.message !== undefined && this.message !== 'undefined';
    // }

    get access_token() {
        return this.oauthService.getAccessToken();
    }

    get access_token_expiration() {
        return this.oauthService.getAccessTokenExpiration();
    }

    get givenName() {
        const claims = this.oauthService.getIdentityClaims();

        if (!claims) {
            return null;
        }

        return null;
        // return claims['given_name'];
    }

    get familyName() {
        const claims = this.oauthService.getIdentityClaims();

        if (!claims) {
            return null;
        }

        return null;
        // return claims['family_name'];
    }

    // get Message():string {
    //     return this.message;
    // }

    loginWithPassword() {
        if (this.loginForm.valid) {
            this.oauthService.configure({ ...passwordFlowAuthConfig, logoutUrl: undefined });
            this.oauthService.loadDiscoveryDocument().then(() => {
                this.oauthService
                    .fetchTokenUsingPasswordFlowAndLoadUserProfile(
                        this.loginForm.get('username').value,
                        this.loginForm.get('password').value
                    )
                    .then(() => {
                        this.store.dispatch(AuthActions.loginEventSuccess());
                    })
                    .catch((error) => {
                        this.message$.next('Invalid Username or passwordis!');
                        // console.log(error);
                        this.store.dispatch(AuthActions.loginEventFail({ payload: error }));
                    });
            });
        }
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }

    logout() {
        this.oauthService.logOut(true);
    }
}
