import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import * as fromProfile from './../../store/reducers/preference.reducer';
import * as fromRoot from './../../store/reducers';
import * as ProfileActions from './../../store/actions/preference.action';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../fragments/components/card/card.component';
import { ThemeOptionComponent } from '../../fragments/components/appThemeOption/appThemeOption.component';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
// import { Preference } from 'src/app/models/preference';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, ThemeOptionComponent, FormsModule, ReactiveFormsModule, CommonModule, AsyncPipe]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private authService = inject(OAuthService);
    public store = inject<Store<fromProfile.IPreferenceState>>(Store);
    form!: FormGroup;
    private fb = inject(FormBuilder);
    dirty = false;

    public x: number;
    public y: number;
    public user: any;
    isDarkMode: Observable<string>;
    private formSubscription: Subscription;

    constructor() {
        this.user = this.authService.getIdentityClaims();
        this.isDarkMode = this.store.select(fromProfile.isDarkMode);
    }
    ngOnDestroy(): void {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            user_id: [''],
            name: [''],
            language: [''],
            email: new FormControl('', [Validators.required, Validators.email]),
            dark_mode: [false]
        });

        this.formSubscription = combineLatest([
            this.store.select(fromRoot.getProfile),
            this.store.select(fromRoot.getUserPreference)
        ]).subscribe(([profile, preference]) => {
            this.form.patchValue({ ...profile, ...preference }, { emitEvent: false });
        });

        this.form.valueChanges.subscribe(() => {
            this.dirty = true;
        });
    }

    onSave() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.dirty = false;
        }
    }
    onDarkModeToggle() {
        this.store.dispatch(ProfileActions.toggleDarkMode());
    }
}
