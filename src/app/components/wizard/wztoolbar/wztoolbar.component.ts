import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
/**
 * This class represents the HeaderComponent.
 */
@Component({
    selector: 'app-toolbar',
    templateUrl: 'wztoolbar.component.html',
    styleUrls: ['wztoolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RouterLinkActive]
})
export class WzToolbarComponent {
    private router = inject(Router);

    public isExpanded = false;
    _user: any;
    activeRoute: string;

    constructor() {
        this.activeRoute = this.router.url;
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
