import { Component, Input, OnInit } from '@angular/core';
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
export class EditSubjectCompetenceComponent implements OnInit {
  @Input() programCompetences: ProgramCompetence[] = [];
  @Input() subjectCompetence!: CompetenceProgramSubject;

  selectedProgramCompetenceId: number | null = null;
  compDescription: string = '';
  compLevel: string = '';
  competenceLevels: string[] = ['Básico', 'Intermedio', 'Avanzado'];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.selectedProgramCompetenceId = this.subjectCompetence.programCompetence;
    this.compDescription = (this.subjectCompetence as any).compDescription || '';
    this.compLevel = (this.subjectCompetence as any).compLevel || '';
    console.log('Subject Competence:', this.subjectCompetence);
    console.log('Selected Program Competence ID:', this.selectedProgramCompetenceId);
  }

  onSave() {
    if (this.compDescription && this.compLevel && this.selectedProgramCompetenceId) {
      this.activeModal.close({
        id: this.subjectCompetence.id, 
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