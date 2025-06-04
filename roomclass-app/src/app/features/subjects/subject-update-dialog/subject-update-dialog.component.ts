import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../../core/models/subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../../core/models/teacher';
import { TeacherService } from '../../../core/services/teacher.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LinkupCompetencesComponent } from '../linkup-competences/linkup-competences.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-update-dialog.component.html',
  styleUrl: './subject-update-dialog.component.css'
})
export class SubjectUpdateDialogComponent {
   @Input() subject!: Subject;
  selectedCompetenceIds: number[] = [];
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  ngOnInit() {
    this.subject = { ...this.subject };
  }

  onSave() {
    this.activeModal.close({
      ...this.subject,
      programCompetencesIds: this.selectedCompetenceIds
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onAssociateCompetencies() {
      //otro modal
      const modalRef = this.modalService.open(LinkupCompetencesComponent, {
            size: 'lg', 
            centered: true,
      });
      // Espera el resultado del modal de competencias
      modalRef.result.then((selectedCompetencesIds) => {
      if (selectedCompetencesIds) {
        // Guarda las competencias seleccionadas en la asignatura (puedes usar otro campo si lo prefieres)
        this.selectedCompetenceIds = selectedCompetencesIds;
        Swal.fire('Competencias asociadas', 'Competencias asociadas correctamente', 'success');
      }
    }, (reason) => {
      // Modal cerrado sin seleccionar competencias
    });
    }
}
