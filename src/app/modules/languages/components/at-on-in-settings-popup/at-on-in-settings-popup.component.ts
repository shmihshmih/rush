import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-at-on-in-settings-popup',
  templateUrl: './at-on-in-settings-popup.component.html',
  styleUrls: ['./at-on-in-settings-popup.component.scss']
})
export class AtOnInSettingsPopupComponent implements OnInit {
  atOnInExerciserConfig: UntypedFormGroup;

  constructor(public dialogRef: MatDialogRef<AtOnInSettingsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.createWordCardSettingsForm(this.data.config);
  }

  createWordCardSettingsForm(config): void {
    this.atOnInExerciserConfig = this.fb.group({
      isRepeat: [config.isRepeat, Validators.required],
      isAuto: [config.isAuto, Validators.required],
      timer: [config.timer, Validators.required],
      russian: [config.russian, Validators.required],
      phrase: [config.phrase, Validators.required],
      simple: [config.simple, Validators.required],
    });
  }

  closePopup(): void {
    this.dialogRef.close({config: this.atOnInExerciserConfig.value});
  }

}
