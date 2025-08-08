import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
import { isDevMode } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

register();
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors([authInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules)),

  ],
});
defineCustomElements(window);