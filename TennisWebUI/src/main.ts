import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { authReducer } from './app/auth/state/auth.reducer';
import { AuthEffects } from './app/auth/state/auth.effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './app/entity-metadata';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { StoreRouterConnectingModule } from '@ngrx/router-store'; // Import RouterStoreConnectingModule
import { AuthGuard } from './app/auth/auth.guard';


bootstrapApplication(AppComponent, //appConfig)
  {
    providers: [
      provideRouter(routes),
      AuthGuard,
      importProvidersFrom(HttpClientModule, MatDialogModule, BrowserAnimationsModule),

      // alternative to `StoreModule.forRoot`
      provideStore({ auth: authReducer }),

      provideEffects([AuthEffects]),

      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
      provideEntityData(entityConfig, withEffects()),

      // alternative to `StoreRouterConnectingModule.forRoot`
      provideRouterStore()    
    ]
  })
  .catch(err => console.error(err));