import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRouterStateSerializer } from './init/app.route.serilizer';
import { NgaModule } from './fragments/nga.module';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';

export const appModules = [
    StoreRouterConnectingModule.forRoot({
        serializer: AppRouterStateSerializer
    }),
    NgaModule.forRoot(),
    AuthModule,
    ThemeModule
];
