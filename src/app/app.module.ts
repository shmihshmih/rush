import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {SocratesModule} from './modules/socrates/socrates.module';
import {BlogModule} from './modules/blog/blog.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {FormsModule} from '@angular/forms';
import {LanguagesModule} from './modules/languages/languages.module';
import {IndexComponent} from './shared/components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BlogModule,
    SocratesModule,
    LanguagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
