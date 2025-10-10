import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    Validators,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
// import { User } from 'oidc-client';
import { ConfirmService } from '../../../fragments/components/dialog/confirm.service';
import { ConfirmTemplateDirective } from '../../../fragments/components/dialog/confirm.directive';
import { DialogInfoComponent } from '../../../fragments/components/dialog/dialogInfo/dialogInfo.component';
import { ConfirmState } from 'src/app/fragments/components/dialog';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ReactiveFormsModule, ConfirmTemplateDirective, DialogInfoComponent],
    providers: [ConfirmService, ConfirmState]
})
export class ProfileComponent implements OnInit {
    private fb = inject(UntypedFormBuilder);
    private authService = inject(OAuthService);
    private confirmService = inject(ConfirmService);

    profileForm: UntypedFormGroup;
    public user: any;

    constructor() {
        this.user = this.authService.getIdentityClaims();
    }

    ngOnInit() {
        this.profileForm = new UntypedFormGroup({
            name: new UntypedFormControl(this.user['name'], [Validators.required]),
            email: new UntypedFormControl(this.user['email'], [Validators.required]),
            lastName: new UntypedFormControl(this.user['given_name'], [Validators.required]),
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
        // if (this.profileForm.valid) {
        // }
    }
}
