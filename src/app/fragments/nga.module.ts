import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { BaBackTopComponent } from './components/baBackTop/baBackTop.component';
import { BaCardComponent } from './components/baCard/baCard.component';
import { AppLoadingComponent } from './components/appLoading/appLoading.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { TextareaExpandedComponent } from './components/textAreaExpanded/textAreaExpanded.component';
import { CheckMarkComponent } from './components/checkMark/checkmark.component';
import { ConfirmService, ConfirmState, ConfirmDialogComponent, DialogInfoComponent, ConfirmTemplateDirective } from './components/dialog';
import { NgbdRatingDecimalComponent } from '../components/movies/components/rating/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatDatePipe } from '../components/movies/directives/dateFormat';
import { SharedModule } from '../components/shared/shared.module';

const NGA_COMPONENTS = [
  BaBackTopComponent,
  BaCardComponent,
  AppLoadingComponent,
  BarchartComponent,
  ConfirmDialogComponent,
  TextareaExpandedComponent,
  DialogInfoComponent,
  CheckMarkComponent,
  NgbdRatingDecimalComponent
  // BaAmChart,
  // BaBackTop,
  // BaCard,
  // BaChartistChart,
  // BaCheckbox,
  // BaContentTop,
  // BaFullCalendar,
  // BaMenuItem,
  // BaMenu,
  // BaMsgCenter,
  // BaMultiCheckbox,
  // BaPageTop,
  // BaPictureUploader,
  // BaSidebar,
  // BaFileUploader
];

const NGA_DIRECTIVES = [
  ConfirmTemplateDirective
  // BaScrollPosition,
  // BaSlimScroll,
  // BaThemeRun,
  // BaCardBlur
];

const NGA_PIPES = [
  FormatDatePipe
  // BaAppPicturePipe,
  // BaKameleonPicturePipe,
  // BaProfilePicturePipe
];

const NGA_SERVICES = [
  ConfirmService,
  ConfirmState
  // BaImageLoaderService,
  // BaThemePreloader,
  // BaThemeSpinner,
  // BaMenuService
];

const NGA_VALIDATORS = [
  // EmailValidator,
  // EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgScrollbarModule,
    NgbModule
    // RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    // AppTranslationModule,
    // NgUploaderModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
export class NgaModule {
  static forRoot(): ModuleWithProviders<NgaModule> {
    return {
      ngModule: NgaModule,
      providers: [
        // BaThemeConfigProvider,
        // BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
