import {Component, EventEmitter, HostBinding, Inject, OnInit, Output} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AuthComponent} from '../auth/auth.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenav = new EventEmitter();
  @HostBinding('class') componentCssClass = 'my-theme';

  constructor(
    public apiService: ApiService,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog) {
  }

  toggleTheme(): void {
    this.componentCssClass === 'default-theme' ? this.componentCssClass = 'dark-theme' : this.componentCssClass = 'default-theme';
    this.overlayContainer.getContainerElement().classList.add(this.componentCssClass);
  }

  ngOnInit(): void {
  }

  sidenavToggle(): void {
    this.sidenav.emit();
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
