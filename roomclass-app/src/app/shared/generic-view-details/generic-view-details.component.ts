import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-view-details',
  templateUrl: './generic-view-details.component.html',
  standalone: true
})
export class GenericViewDetailsComponent {
  @Input() item: any = null;
  @Input() title?: string;

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}