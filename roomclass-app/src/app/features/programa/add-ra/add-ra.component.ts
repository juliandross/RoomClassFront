import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RAProgram } from '../../../core/models/RAProgram';

@Component({
  selector: 'app-add-ra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ra.component.html',
  styleUrl: './add-ra.component.css'
})
export class AddRaComponent {
  @Input() competenceId!: number;
  ra: Partial<RAProgram> = {
    id: 0,
    proRADescription: '',
    programCompetence: 0
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSave() {
    this.activeModal.close({ ...this.ra, competenceId: this.competenceId });
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}