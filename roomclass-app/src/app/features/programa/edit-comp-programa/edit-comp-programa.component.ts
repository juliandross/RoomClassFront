import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramCompetence } from '../../../core/models/ProgramCompetence';

@Component({
  selector: 'app-edit-comp-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-comp-programa.component.html',
  styleUrl: './edit-comp-programa.component.css'
})
export class EditCompProgramaComponent {
  @Input() competence!: ProgramCompetence;

  constructor(public activeModal: NgbActiveModal) {}

  onSave() {
    this.activeModal.close(this.competence);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}