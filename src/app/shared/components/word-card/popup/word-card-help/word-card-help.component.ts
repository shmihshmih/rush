import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

class DialogData {
}

@Component({
  selector: 'app-word-card-help',
  templateUrl: './word-card-help.component.html',
  styleUrls: ['./word-card-help.component.scss']
})
export class WordCardHelpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WordCardHelpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // @ts-ignore
    console.log('data: ', this.data.text);
  }

}
