import { DictionaryService } from '../../core/services/esperanto/store/dictionary.service';
import { EsperantoService } from '../../core/services/esperanto/esperanto.service';
import { EsperantoRoutingModule } from './esperanto-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    EsperantoRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexModule
  ],
  providers: [DictionaryService, EsperantoService]
})
export class EsperantoModule { }
