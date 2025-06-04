import { Component, OnInit } from '@angular/core';
import { ProgramCompetence, ProgramCompetenceRAResponse } from '../../../core/models/ProgramCompetence';
import { ProgramCompetenceService } from '../../../core/services/ProgramCompetence.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-linkup-competences',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './linkup-competences.component.html',
  styleUrl: './linkup-competences.component.css'
})
export class LinkupCompetencesComponent implements OnInit {
  programCompetences: ProgramCompetenceRAResponse [] = [];
  selectedCompetenceIds: number[] = [];

  constructor(private programCompetenceService: ProgramCompetenceService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.programCompetenceService.getProgramCompetences().subscribe(
      programCompetences => this.programCompetences = programCompetences
    );
  }

  onCheckBoxChange(event: Event, id: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCompetenceIds.push(id);
    } else {
      this.selectedCompetenceIds = this.selectedCompetenceIds.filter(val => val !== id);
    }
}

  onLink() {
    this.activeModal.close(this.selectedCompetenceIds);
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
