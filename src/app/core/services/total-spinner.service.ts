import { Injectable } from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerOverlayComponent} from '../../shared/components/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class TotalSpinnerService {
  private overlayRef: OverlayRef = null;
  constructor(private overlay: Overlay) { }

  public show(): void {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
    this.overlayRef.detach();
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide(): void {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
