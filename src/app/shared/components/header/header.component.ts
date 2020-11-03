import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenav = new EventEmitter();
  @HostBinding('class') componentCssClass = 'default-theme';
  constructor(public overlayContainer: OverlayContainer){}
  toggleTheme(): void {
    this.componentCssClass === 'default-theme' ? this.componentCssClass = 'dark-theme' : this.componentCssClass = 'default-theme';
    this.overlayContainer.getContainerElement().classList.add(this.componentCssClass);
  }
  ngOnInit(): void {
  }
  sidenavToggle(): void {
    this.sidenav.emit();
  }

}
