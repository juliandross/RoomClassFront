import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectCompetenceWrapper } from '../../core/models/subject-competence-wrapper';

@Component({
  selector: 'app-generic-view-details',
  templateUrl: './generic-view-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class GenericViewDetailsComponent {
  @Input() competences: SubjectCompetenceWrapper[] = [];
  @Input() item: any;
  @Input() title?: string;
  
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}