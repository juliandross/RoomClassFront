import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-view-details',
  templateUrl: './generic-view-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class GenericViewDetailsComponent {
  @Input() item: any = null;
  @Input() title?: string;
  
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}