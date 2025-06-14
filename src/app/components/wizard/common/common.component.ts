import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
/**
 * This class represents the HeaderComponent.
 */
@Component({
    selector: 'app-wz-common',
    templateUrl: 'common.component.html',
    styleUrls: ['common.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class WzCommonComponent {
    private router = inject(Router);

    public isExpanded = false;
    _user: any;
    activeRoute: string;

    // ngOnInit() {
    // this.service.userLoadededEvent
    //   .subscribe(user => {
    //     this._user = user;
    // });
    // }

    isUserLoggedIn() {
        return false;
        // let isLoggedIn = this.service.isLoggedInObs();
        // return isLoggedIn;
    }
}
