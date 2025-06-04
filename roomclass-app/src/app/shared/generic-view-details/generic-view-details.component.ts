import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-generic-view-details',
  templateUrl: './generic-view-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class GenericViewDetailsComponent {  
  @Input() title: string = '';
  @Input() item: any;
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}