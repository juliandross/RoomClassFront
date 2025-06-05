import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramCompetence } from '../../../core/models/ProgramCompetence';

@Component({
  selector: 'app-create-comp-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-comp-programa.component.html',
  styleUrl: './create-comp-programa.component.css'
})
export class CreateCompProgramaComponent {
  competence: Partial<ProgramCompetence> = {
    proCompDescription: '',
    proCompLevel: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSave() {
    this.activeModal.close(this.competence);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}