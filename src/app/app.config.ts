import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from './app.module';
import { provideRouterStore, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromApp from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      StoreModule.forRoot({},{}),
      StoreModule.forRoot(
        fromApp.reducers, {
        metaReducers: fromApp.metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictStateSerializability: true,
          strictActionImmutability: true,
          strictActionSerializability: true
        }
      }),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot({
        stateKey: "router",
        routerState: RouterState.Minimal
      }),
      AppModule,
      AuthModule,
      CoursesModule
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideRouterStore(),
  ],
};
