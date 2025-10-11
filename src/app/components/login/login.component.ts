import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
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
// import { passwordFlowAuthConfig } from 'src/app/auth/auth.config';
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
    private store = inject<Store<fromRoot.IAppState>>(Store);
    private oauthService = inject(OAuthService);
    // private route = inject(ActivatedRoute);
    private router = inject(Router);

    @HostBinding('@routerFadeInAnimation')
    userProfile: object;
    loginForm: UntypedFormGroup;
    message$ = new BehaviorSubject<string>('');

    showPassword = false;
    isLoading: boolean = false;

    constructor() {
        // this.subscription = this.store
        //     .select(fromRoot.getError)
        //     .subscribe((err) => this.message$.next(err?.error?.error_description));
        // this.route.params.subscribe((params) => (this.message = params['endsession']));

        if (this.oauthService.hasValidAccessToken()) {
            this.router.navigate(['/home']);
            // return
        }
    }
    // ngOnDestroy(): void {
    //     if (this.subscription) this.subscription.unsubscribe();
    // }

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
            this.isLoading = true;
            this.store.dispatch(
                AuthActions.loginWithUserNamePassword({
                    username: this.loginForm.get('username').value,
                    password: this.loginForm.get('password').value
                })
            );

            this.isLoading = false;
            // this.oauthService.configure({ ...passwordFlowAuthConfig, logoutUrl: undefined });
            // this.oauthService.loadDiscoveryDocument().then(() => {
            //     this.oauthService
            //         .fetchTokenUsingPasswordFlowAndLoadUserProfile(
            //             this.loginForm.get('username').value,
            //             this.loginForm.get('password').value
            //         )
            //         .then(() => {
            //             this.store.dispatch(AuthActions.loginWithPasswordSuccess());
            //             this.isLoading = false;
            //         })
            //         .catch((error) => {
            //             this.message$.next(error.error.error_description);
            //             this.store.dispatch(AuthActions.loginEventFail({ payload: error }));
            //             this.isLoading = false;
            //         });
            // });
        }
    }

    showLogging() {
        return this.store.select(fromRoot.showLogging);
    }

    get error$() {
        return this.store.select(fromRoot.getError);
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }

    logout() {
        this.oauthService.logOut(true);
    }
}
