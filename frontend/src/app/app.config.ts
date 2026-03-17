import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeatures } from './shared/store/auth-feature';
import * as authEffects from './shared/store/auth-effect';
import * as profileEffects from './pages/profile/store/profile-effect';
import { provideNgToast } from 'ng-angular-popup';
import { LucideAngularModule, LogOut, User, ShoppingCart, Github, Twitter, Mail, MapPin, Phone,  } from 'lucide-angular';
import { profileFeature } from './pages/profile/store/profile-feature';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects([authEffects, profileEffects]),
    provideState(authFeatures),
    provideState(profileFeature),
    {
      provide: API_URL,
      useValue: 'https://fakestoreapi.com'
    },
    provideNgToast({
      duration: 2500,
      position: 'toaster-top-right',
      minWidth: 350,
    }),
    importProvidersFrom(
      LucideAngularModule.pick({ LogOut, User, ShoppingCart, Github, Twitter, Mail, MapPin, Phone,  })
    )
  ],
};
