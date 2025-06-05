
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramCompetence } from '../../../core/models/ProgramCompetence';
import { CompetenceProgramSubject } from '../../../core/models/competence-program-subject';

@Component({
  selector: 'app-edit-subject-competence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-competence.component.html',
  styleUrl: './edit-competence.component.css'
})
export class EditSubjectCompetenceComponent {
  @Input() programCompetences: ProgramCompetence[] = [];
  @Input() subjectCompetence!: CompetenceProgramSubject;

  selectedProgramCompetenceId: number | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.selectedProgramCompetenceId = this.subjectCompetence.programCompetence;
  }

  onSave() {
    if (this.selectedProgramCompetenceId) {
      this.activeModal.close({
        ...this.subjectCompetence,
        programCompetence: this.selectedProgramCompetenceId
      });
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}