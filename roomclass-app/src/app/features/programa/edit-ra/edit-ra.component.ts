import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RAProgram } from '../../../core/models/RAProgram';

@Component({
  selector: 'app-edit-ra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-ra.component.html',
  styleUrl: './edit-ra.component.css'
})
export class EditRaComponent {
  @Input() ra!: RAProgram;

  constructor(public activeModal: NgbActiveModal) {}

  onSave() {
    this.activeModal.close(this.ra);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}