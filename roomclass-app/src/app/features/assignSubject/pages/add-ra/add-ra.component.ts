import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectRA } from '../../../../core/models/subject';
@Component({
  selector: 'app-add-ra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ra.component.html',
  styleUrl: './add-ra.component.css'
})
export class AddRaComponent {
  @Input() competenceId!: number;
  ra: Partial<SubjectRA> = {
    id: 0,
    raDescription: '',
    subjectCompetence: 0
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSave() {
    this.activeModal.close({ ...this.ra, competenceId: this.competenceId });
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}