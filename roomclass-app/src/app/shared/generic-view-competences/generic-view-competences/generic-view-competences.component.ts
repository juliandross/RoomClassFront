import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() assignSubjectView: boolean = false;  

  @Output() onViewRA = new EventEmitter<any>();
  @Output() onAddRA = new EventEmitter<any>();
  @Output() onEditRA = new EventEmitter<any>();
  @Output() onDeleteRA = new EventEmitter<any>();
  @Output() onEditCompetence = new EventEmitter<any>();
  @Output() onAddCompetence = new EventEmitter<any>();
  @Output() onDeleteCompetence = new EventEmitter<any>();

  getLimitRA(competence:CompetenceWrapper): boolean{    
    if(this.programView && competence.ras.length >= 1){      
      return true;
    }
  return false;
  }
  getLimitCompetences(): boolean{    
    //A assignation can't have more than 3 competences
    if(this.assignSubjectView && this.competencesWrapper.length >= 3){      
      return true;
    }
  return false; 
  }
}
