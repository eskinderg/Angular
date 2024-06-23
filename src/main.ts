import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bootstrap();

async function bootstrap(): Promise<any> {
    return import('./app/app.module')
        .then((m) => platformBrowserDynamic().bootstrapModule(m.AppModule))
        .catch((err) => console.error(err));
}
