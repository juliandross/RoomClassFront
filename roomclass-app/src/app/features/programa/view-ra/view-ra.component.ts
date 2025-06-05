import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RAProgram } from '../../../core/models/RAProgram';

@Component({
  selector: 'app-view-ra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-ra.component.html',
  styleUrl: './view-ra.component.css'
})
export class ViewRaComponent {
  @Input() ra!: RAProgram;

  constructor(public activeModal: NgbActiveModal) {}

  onClose() {
    this.activeModal.dismiss();
  }
}