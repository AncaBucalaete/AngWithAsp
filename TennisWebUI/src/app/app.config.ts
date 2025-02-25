import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideRouterStore } from '@ngrx/router-store';
import { entityConfig } from './entity-metadata';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './auth/state/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideStore({ auth: authReducer}), 
    provideEffects(), 
    provideEntityData(entityConfig, withEffects()), 
    provideRouterStore(), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync()
  ]
};
