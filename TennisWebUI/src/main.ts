import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/auth/state/auth.reducer';
import { AuthEffects } from './app/auth/state/auth.effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './app/entity-metadata';
import { provideRouterStore } from '@ngrx/router-store';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, MatDialogModule, BrowserAnimationsModule),
    // ✅ Provide Store Properly
    provideStore({ auth: authReducer }),
    provideEffects(AuthEffects),
    // ✅ Enable Store Devtools in Dev Mode
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEntityData(entityConfig, withEffects()),
    provideRouterStore()
]
}).catch(err => console.error(err));