import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EsperantoService} from '../../../../core/services/esperanto/esperanto.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  wordForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private esperantoService: EsperantoService
  ) {
  }

  ngOnInit(): void {
    this.createWordForm();
    if (this.data && this.data.word) {
      this.formPatcher(this.wordForm, this.data.word);
    }
  }

  createWordForm(): void {
    this.wordForm = this.fb.group({
      word_type: ['', Validators.required],
      esperanto: ['', Validators.required],
      english: ['', Validators.required],
      russian: ['', Validators.required],
    });
  }

  formPatcher(form, data): void {
    form.patchValue({
      ...data
    });
  }

  addWord(): void {
    this.esperantoService.addWord(this.wordForm.value).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      if (!res.error) {
        this.dialogRef.close(res);
      }
    });
  }

  updateWord(wordId): void {
    this.esperantoService.updateWord({_id: wordId, ...this.wordForm.value}).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      if (!res.error) {
        this.dialogRef.close(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
