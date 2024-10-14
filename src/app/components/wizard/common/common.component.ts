import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    public isExpanded = false;
    _user: any;
    activeRoute: string;

    constructor(private router: Router) {
        // this.activeRoute = this.router.url;
        // console.log(this.router.routerState);
    }

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
