import {NavListComponent} from './components/nav-list/nav-list.component';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from './material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WordListComponent} from './components/word-list/word-list.component';
import {WordCardComponent} from './components/word-card/word-card.component';
import {WordCardHelpComponent} from './components/word-card/popup/word-card-help/word-card-help.component';
import {WordCardSettingsComponent} from './components/word-card/popup/word-card-settings/word-card-settings.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    NavListComponent,
    WordListComponent,
    WordCardComponent,
    WordCardHelpComponent,
    WordCardSettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavListComponent,
    FlexLayoutModule,
    WordListComponent,
    WordCardComponent,
    ReactiveFormsModule
  ],
  entryComponents: [WordCardHelpComponent, WordCardSettingsComponent]
})
export class SharedModule {
}
