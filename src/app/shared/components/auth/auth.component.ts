import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api.service';
import {Store} from '@ngrx/store';
import {makeAuthorization} from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private apiService: ApiService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store) {
  }

  ngOnInit(): void {
    this.createAuthForm();
  }

  createAuthForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  closePopup(): void {
    const authData = {...this.authForm.value};
    localStorage.setItem('authData', JSON.stringify(authData));
    this.store.dispatch(makeAuthorization());
  }

}
