import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EsperantoService} from '../../core/services/esperanto/esperanto.service';
import {FlexModule} from '@angular/flex-layout';
import {IndexComponent} from './pages/index/index.component';
import {LanguagesRoutingModule} from './languages-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {EnglishSentencesCreatorComponent} from './pages/english-sentences-creator/english-sentences-creator.component';
import {EscSettingsPopupComponent} from './components/esc-settings-popup/esc-settings-popup.component';
import {AtOnInExerciserComponent} from './pages/at-on-in-exerciser/at-on-in-exerciser.component';
import {AtOnInSettingsPopupComponent} from './components/at-on-in-settings-popup/at-on-in-settings-popup.component';


@NgModule({
  declarations: [IndexComponent, EnglishSentencesCreatorComponent, EscSettingsPopupComponent, AtOnInExerciserComponent, AtOnInSettingsPopupComponent],
  imports: [
    CommonModule,
    FlexModule,
    LanguagesRoutingModule,
    SharedModule
  ],
  providers: [EsperantoService]
})
export class LanguagesModule {
}
