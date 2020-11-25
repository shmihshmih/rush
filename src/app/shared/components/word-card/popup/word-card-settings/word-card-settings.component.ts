import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

class DialogData {
}

@Component({
  selector: 'app-word-card-settings',
  templateUrl: './word-card-settings.component.html',
  styleUrls: ['./word-card-settings.component.scss']
})
export class WordCardSettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WordCardSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log('data: ', this.data);
  }

}
