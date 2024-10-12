import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { AuthService } from './services/auth/auth.service';
import { AuthService } from './../../shared/auth.service';

import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './header/userinfo/userinfo.component';
import { FooterComponent } from './footer/footer.component';
import { TruncatePipe } from '../movies/directives/truncate';
import { NoteTitleTruncatePipe } from '../movies/directives/noteTitleTruncate';

import { ThemeOptionComponent } from 'src/app/fragments/components/appThemeOption/appThemeOption.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        UserInfoComponent,
        FooterComponent,
        TruncatePipe,
        NoteTitleTruncatePipe,
        ThemeOptionComponent
    ],
    exports: [
        HeaderComponent,
        UserInfoComponent,
        FooterComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TruncatePipe,
        NoteTitleTruncatePipe,
        ThemeOptionComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [AuthService]
        };
    }
}
