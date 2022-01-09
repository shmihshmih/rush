import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-esc-settings-popup',
  templateUrl: './esc-settings-popup.component.html',
  styleUrls: ['./esc-settings-popup.component.scss']
})
export class EscSettingsPopupComponent implements OnInit {
  configForm: FormGroup;

  withTranslateControl = new FormControl();
  withTranslate = false;

  constructor(
    public dialogRef: MatDialogRef<EscSettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.configForm = this.fb.group({
      times: this.fb.array([]),
      pronouns: this.fb.array([]),
      sentenceType: this.fb.array([]),
      verbs: this.fb.array([]),
    });

    this.withTranslateControl.patchValue(data.withTranslate);
  }

  ngOnInit(): void {
    // пушим полученне данные в формате котролов
    this.data.times.forEach(() => {
      this.times.push(this.fb.control(false));
    });
    this.data.pronouns.forEach(() => {
      this.pronouns.push(this.fb.control(false));
    });
    this.data.sentenceType.forEach(() => {
      this.sentenceType.push(this.fb.control(false));
    });
    this.data.verbs.forEach(() => {
      this.verbs.push(this.fb.control(false));
    });
  }

  // выставляем эти переменные как массив контролов из формы configForm
  get times(): any {
    return this.configForm?.controls['times'] as FormArray;
  }

  get pronouns(): any {
    return this.configForm?.controls['pronouns'] as FormArray;
  }

  get sentenceType(): any {
    return this.configForm?.controls['sentenceType'] as FormArray;
  }

  get verbs(): any {
    return this.configForm?.controls['verbs'] as FormArray;
  }

  /** Кнопка Выбрать все глаголы */
  setVerbs(mode: 'all' | 'irregular' | 'regular', status): void {
    switch (mode) {
      case 'all':
        if (status) {
          this.verbs.controls.forEach((el, i) => {
            this.verbs.controls[i].patchValue(true);
          });
        } else {
          this.verbs.controls.forEach((el, i) => {
            this.verbs.controls[i].patchValue(false);
          });
        }
        break;
      case 'irregular':
        const allIrregular = this.data.verbs.map((v, i) => {
          if (v.word_type.indexOf('irregular_verbs') !== -1) {
            return i;
          }
        }).filter(el => el);
        if (status) {
          allIrregular.forEach((el) => {
            this.verbs.controls[el].patchValue(true);
          });
        } else {
          allIrregular.forEach((el) => {
            this.verbs.controls[el].patchValue(false);
          });
        }
        break;
      case 'regular':
        const regular = this.data.verbs.map((v, i) => {
          if (v.word_type.indexOf('irregular_verbs') === -1) {
            return i;
          }
        }).filter(el => el);
        if (status) {
          regular.forEach((el) => {
            this.verbs.controls[el].patchValue(true);
          });
        } else {
          regular.forEach((el) => {
            this.verbs.controls[el].patchValue(false);
          });
        }
        break;
    }
  }

  /** Кнопка Выбрать все типы предложений */
  allSentenceTypes(mode: string, checkbox: boolean): void {
    switch (mode) {
      case 'all':
        this.sentenceType.controls.forEach((el, i) => {
          this.sentenceType.controls[i].patchValue(checkbox);
        });
        break;
    }
  }

  /** Кнопка Выбрать все времена */
  setAllTimes(mode: string, checkbox: boolean): void {
    switch (mode) {
      case 'all':
        this.times.controls.forEach((el, i) => {
          this.times.controls[i].patchValue(checkbox);
        });
        break;
    }
  }

  /** Кнопка Выбрать все местоимения */
  setAllPronouns(mode: string, checkbox: boolean): void {
    switch (mode) {
      case 'all':
        this.pronouns.controls.forEach((el, i) => {
          this.pronouns.controls[i].patchValue(checkbox);
        });
        break;
    }
  }

  submitConfigs(): void {
    const chosenTimes = this.configForm.value.times.map((el, i) => {
      return el === true ? this.data.times[i] : null;
    }).filter(el => el);
    const chosenPronouns = this.configForm.value.pronouns.map((el, i) => {
      return el === true ? this.data.pronouns[i] : null;
    }).filter(el => el);
    const chosenSentenceType = this.configForm.value.sentenceType.map((el, i) => {
      return el === true ? this.data.sentenceType[i] : null;
    }).filter(el => el);
    const chosenVerbs = this.configForm.value.verbs.map((el, i) => {
      return el === true ? this.data.verbs[i] : null;
    }).filter(el => el);
    const config = {
      times: chosenTimes,
      pronouns: chosenPronouns,
      sentenceType: chosenSentenceType,
      verbs: chosenVerbs,
      withTranslate: this.withTranslateControl.value
    };
    this.dialogRef.close({config});
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
