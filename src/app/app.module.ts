import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {SocratesModule} from './modules/socrates/socrates.module';
import {EsperantoModule} from './modules/esperanto/esperanto.module';
import {EnglishModule} from './modules/english/english.module';
import {BlogModule} from './modules/blog/blog.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BlogModule,
    EnglishModule,
    EsperantoModule,
    SocratesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
