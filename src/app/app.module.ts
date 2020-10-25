import { SocratesModule } from './modules/socrates/socrates.module';
import { EsperantoModule } from './modules/esperanto/esperanto.module';
import { EnglishModule } from './modules/english/english.module';
import { BlogModule } from './modules/blog/blog.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BlogModule,
    EnglishModule,
    EsperantoModule,
    SocratesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
