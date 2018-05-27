import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BaBackTop } from './components/baBackTop/baBackTop.component';
import { BaCard } from './components/baCard/baCard.component';
import { AppLoadingComponent } from './components/appLoading/appLoading.component';
import { BarchartComponent } from './components/barchart/barchart.component';

import {
  ConfirmService,
  ConfirmState,
  ConfirmModalComponent,
  ModalInfoComponent,
  ConfirmTemplateDirective
} from './components/modal';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  AppLoadingComponent,
  BarchartComponent,
  ConfirmModalComponent,
  ModalInfoComponent
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
    CommonModule
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
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
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
