import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import de from '@angular/common/locales/de';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { map, take } from 'rxjs/operators';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import { 
  StoreRouterConnectingModule, 
  RouterStateSerializer } from '@ngrx/router-store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { reducers, metaReducers, CustomSerializer } from './reducers';

import { select, Store, StoreModule } from '@ngrx/store';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DeviceDetectorService } from 'ngx-device-detector';

/**
 * register locales
 * all required locales have to be imported
 */
registerLocaleData(de);

/**
 * factory function to instantiate and config
 * the tranlation service
 * @param http ng http client
 */
export function createTanslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * jwt options factory to obtain token from the
 * store
 * @param store Store
 */
export function jwtOptionsFactory(store) {
  // return {
  //   whitelistedDomains: environment.whitelistedDomains,
  //   headerName: "x-auth-token",
  //   tokenGetter: () => {
  //     return store.pipe(
  //       select(fromAuth.getAccessToken),
  //       map(token => token),
  //       take(1)
  //     ).toPromise();
  //   }
  // };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DashboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTanslateLoader),
        deps: [HttpClient]
      }
    }),

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Store]
      }
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
  ],
  exports: [RouterModule],
  providers: [
    Store,
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    DeviceDetectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
