import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth/auth.service';
import * as fromRoot from '../../store/reducers';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UnauthorizedComponent {
    private location = inject(Location);
    private service = inject(AuthService);
    private store = inject<Store<fromRoot.IAppState>>(Store);

    login() {
        // this.store.dispatch(new AuthActions.loginEvent());
    }

    goback() {
        this.location.back();
    }

    startSignoutMainWindow() {
        // this.service.startSignoutMainWindow();
        this.service.logout();
    }
}
