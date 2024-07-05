import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { AppRoutingModule } from './app-routing.module';
import { NgaModule } from './fragments/nga.module';
import { SharedModule } from './components/shared/shared.module';
import { UnauthorizedModule } from './components/unauthorized/unauthorized.module';
import { NotfoundModule } from './components/shared/404/404.module';
import { AppComponent } from './app.component';
import { GlobalNotificationModule } from './shared/notification/global.notification.module';
import { APP_INIT } from './app.init';
import { AppRouterStateSerializer } from './init/app.route.serilizer';
import { AppStoreModule } from './store/app.store.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './components/notes/notes.module';
import { EventsModule } from './components/events/events.module';
import { ThemeModule } from './theme/theme.module';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AuthModule,
        UnauthorizedModule,
        GlobalNotificationModule,
        NotfoundModule,
        AuthorizationModule,
        BrowserAnimationsModule,
        AppStoreModule,
        NgaModule.forRoot(),
        SharedModule.forRoot(),
        NgbModule,
        AppRoutingModule,
        ThemeModule,
        NotesModule,
        EventsModule,
        StoreRouterConnectingModule.forRoot({
            serializer: AppRouterStateSerializer
        })
    ],
    providers: [APP_INIT]
})
export class AppModule {
    constructor() {}
}
