import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramCompetence } from '../../../core/models/ProgramCompetence';

@Component({
  selector: 'app-add-subject-competence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-competence.component.html',
  styleUrl: './add-competence.component.css'
})
export class AddSubjectCompetenceComponent {
  @Input() programCompetences: ProgramCompetence[] = [];
  selectedProgramCompetenceId: number | null = null;
  compDescription: string = '';
  compLevel: string = '';
  
  constructor(public activeModal: NgbActiveModal) {}
  

  onSave() {
    if (this.compDescription && this.compLevel && this.selectedProgramCompetenceId) {
      this.activeModal.close({
        compDescription: this.compDescription,
        compLevel: this.compLevel,
        programCompetence: this.selectedProgramCompetenceId
      });
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}