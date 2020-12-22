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
import {AuthComponent} from './components/auth/auth.component';
import {AddListComponent} from './components/popup/add-list/add-list.component';
import {AddWordComponent} from './components/popup/add-word/add-word.component';
import {WordListsComponent} from './components/word-lists/word-lists.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    HeaderComponent,
    NavListComponent,
    WordListComponent,
    WordCardComponent,
    WordCardHelpComponent,
    WordCardSettingsComponent,
    AuthComponent,
    AddListComponent,
    AddWordComponent,
    WordListsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavListComponent,
    FlexLayoutModule,
    WordListComponent,
    WordCardComponent,
    ReactiveFormsModule,
    WordListsComponent
  ],
  entryComponents: [WordCardHelpComponent, WordCardSettingsComponent, AuthComponent, AddListComponent, AddWordComponent]
})
export class SharedModule {
}
