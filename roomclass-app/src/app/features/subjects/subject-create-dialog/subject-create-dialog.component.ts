import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../../core/models/subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models/teacher';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LinkupCompetencesComponent } from '../linkup-competences/linkup-competences.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-create-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-create-dialog.component.html',
  styleUrl: './subject-create-dialog.component.css'
})
export class SubjectCreateDialogComponent {
  subject: Partial<Subject> = {
    subjectName: '',
    subjectDescription: '',
    subjectCredits: 1,
    subjectSemester: 1,
    is_active: true
  };
  selectedCompetenceIds: number[] = [];
  
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}


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