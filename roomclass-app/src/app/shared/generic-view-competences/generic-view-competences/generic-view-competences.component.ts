import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CompetenceWrapper } from '../../../core/services/competence-mapper.service';

@Component({
  selector: 'app-generic-view-competences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-view-competences.component.html',
  styleUrl: './generic-view-competences.component.css'
})
export class GenericViewCompetencesComponent {
  @Input() competencesWrapper:CompetenceWrapper[] = [];    
  @Input() programView: boolean = false;
}
