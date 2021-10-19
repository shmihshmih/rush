import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AuthComponent} from '../auth/auth.component';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api.service';
import {selectIsAuth} from '../../../state/auth/auth.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth$ = this.store.select(selectIsAuth);
  @Output() sidenav = new EventEmitter();
  @HostBinding('class') componentCssClass = 'my-theme';

  constructor(
    public apiService: ApiService,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog,
    private store: Store) {
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
