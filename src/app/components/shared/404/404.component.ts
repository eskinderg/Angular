import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { UserManager} from 'oidc-client';
// import * as Oidc from 'oidc-client/lib/oidc-client.js';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-notfound',
    templateUrl: './404.component.html',
    styleUrls: ['./404.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotfoundComponent {
    private authService = inject(AuthService);

    // ngOnInit() {}
}
