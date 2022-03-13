import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuardService } from './services/auth/auth-guard.service';
// import { AuthService } from './services/auth/auth.service';
import { AuthService } from './../../shared/auth.service';

import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './header/userinfo/userinfo.component';
import { FooterComponent } from './footer/footer.component';
import { TruncatePipe } from '../movies/directives/truncate';

import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule],
  declarations: [
    HeaderComponent,
    UserInfoComponent,
    FooterComponent,
    TruncatePipe
  ],
  exports: [
    HeaderComponent,
    UserInfoComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    TruncatePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuardService
      ]
    };
  }
}
