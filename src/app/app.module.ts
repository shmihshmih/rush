import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {FormsModule} from '@angular/forms';
import {LanguagesModule} from './modules/languages/languages.module';
import {IndexComponent} from './shared/components/index/index.component';
import {AutoHRModule} from './modules/auto-hr/auto-hr.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {WordsEffects} from './state/languages/words/words.effects';
import {StoreModuleReducers} from './state/app.state';
import * as fromWords from './state/languages/words/index';
import * as fromAuth from './state/auth';
import * as fromTasks from './state/autoHR';
import {authReducer} from './state/auth/auth.reducer';
import {AuthEffects} from './state/auth/auth.effects';
import {AutoHREffects} from './state/autoHR/autoHR.effects';
import * as fromBlog from './state/blog';
import {BlogEffects} from './state/blog/blog.effects';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {getRemoteConfig, provideRemoteConfig} from '@angular/fire/remote-config';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {ToastrModule} from 'ngx-toastr';
import { AutoHrLayoutComponent } from './layouts/auto-hr-layout/auto-hr-layout.component';
import { BlogLayoutComponent } from './layouts/blog-layout/blog-layout.component';
import { LanguagesLayoutComponent } from './layouts/languages-layout/languages-layout.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    IndexComponent,
    AutoHrLayoutComponent,
    BlogLayoutComponent,
    LanguagesLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    LanguagesModule,
    AutoHRModule,
    StoreModule.forRoot(StoreModuleReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    StoreModule.forFeature(fromWords.wordsFeatureKey, fromWords.wordsReducers),
    StoreModule.forFeature(fromTasks.autoHRFeatureKey, fromTasks.autoHRReducers),
    StoreModule.forFeature(fromAuth.authFeatureKey, authReducer),
    StoreModule.forFeature(fromBlog.blogFeatureKey, fromBlog.blogReducers),
    EffectsModule.forRoot([WordsEffects, AuthEffects, AutoHREffects, BlogEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
