import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
// import { OAuthService } from 'angular-oauth2-oidc';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, AsyncPipe } from '@angular/common';
import { UserInfoComponent } from './userinfo/userinfo.component';
import { AuthPermission } from 'src/app/auth/auth.permission.service';
import { StoreService } from 'src/app/store/store.service';
import { SvgIconComponent } from '../svg/svg.component';

export declare interface IsActiveMatchOptions {
    fragment: 'exact' | 'ignored';
    matrixParams: 'exact' | 'subset' | 'ignored';
    paths: 'exact' | 'subset';
    queryParams: 'exact' | 'subset' | 'ignored';
}

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RouterLinkActive, SvgIconComponent, NgClass, UserInfoComponent, AsyncPipe]
})
export class HeaderComponent {
    permission = inject(AuthPermission);
    private router = inject(Router);
    private storeService = inject(StoreService);

    @Output() signout: EventEmitter<any> = new EventEmitter();
    public isExpanded = false;
    _user: any;

    routerLinkActiveOptions: IsActiveMatchOptions = {
        matrixParams: 'ignored',
        queryParams: 'subset',
        fragment: 'ignored',
        paths: 'subset'
    };

    // ngOnInit() {
    // this.claims = this.oauthService.getIdentityClaims();
    // if(this.claims){
    //  this.name = this.claims.name;
    // }
    // this.oauthService.loadUserProfile().then(profile => {
    //   this._user = profile;
    //   // console.log(this._user);
    // })
    // this.service.mgr.events.addUserLoaded(function (loadedUser) {
    //   this._user = loadedUser;
    // });
    // }

    get isNotesURLActive() {
        return this.router.isActive('/notes', this.routerLinkActiveOptions);
    }

    get EventsCount() {
        return this.storeService.select(this.storeService.selectors.getEventsLength);
    }

    get EventLoading() {
        return this.storeService.select(this.storeService.selectors.getIsLoading);
    }

    get NotesCount() {
        return this.storeService.select(this.storeService.selectors.getNotesLength);
    }

    get NoteLoading() {
        return this.storeService.select(this.storeService.selectors.getIsLoading);
    }

    get WatchListCount() {
        return this.storeService.select(this.storeService.selectors.getWatchListCount);
    }

    onSignout() {
        // this.service.logout();
    }

    get IsLoggedIn() {
        return this.storeService.select(this.storeService.selectors.isLoggedIn);
    }
}
