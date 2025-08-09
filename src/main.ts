import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
import { isDevMode, LOCALE_ID } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

register();
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LOCALE_ID, useValue: 'es' },
    provideIonicAngular(),
    provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors([authInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules)),

  ],
});
defineCustomElements(window);