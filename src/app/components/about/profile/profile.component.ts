import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
// import { User } from 'oidc-client';
import { ConfirmService } from '../../../fragments/components/dialog/confirm.service';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    profileForm: UntypedFormGroup;
    public user: any;

    constructor(
        private fb: UntypedFormBuilder,
        private authService: OAuthService,
        private confirmService: ConfirmService
    ) {
        this.user = this.authService.getIdentityClaims();
    }

    ngOnInit() {
        this.profileForm = new UntypedFormGroup({
            name: new UntypedFormControl(this.user['given_name'], [Validators.required]),
            email: new UntypedFormControl(this.user['email'], [Validators.required]),
            lastName: new UntypedFormControl(this.user['family_name'], [Validators.required]),
            website: new UntypedFormControl(this.user['website'], [Validators.required])
        });
        // this.profileForm = this.fb.group({
        //   'name': ['', [Validators.required]],
        //   'email': ['', [Validators.required]],
        //   'lastName': ['', [Validators.required]],
        //   'website': ['', [Validators.required]],
        // });
    }

    onSubmit() {
        if (this.profileForm.valid) {
            this.confirmService
                .openInfoDialog({
                    title: 'Profile',
                    message: 'Profile Saved',
                    backdrop: true,
                    centered: false
                })
                .then(
                    () => {},
                    () => {
                        console.log();
                    }
                );
        }
    }
}
