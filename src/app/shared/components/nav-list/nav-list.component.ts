import { Component, OnInit } from '@angular/core';
import {AuthComponent} from '../auth/auth.component';
import {ApiService} from '../../../core/services/api.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  constructor(
    public apiService: ApiService,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAuth(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      panelClass: [''],
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
    });
  }
}
