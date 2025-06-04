import { Component } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../core/models/subject';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from "../../shared/generic-list/generic-list.component";
import { SubjectCreateDialogComponent } from './subject-create-dialog/subject-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SubjectUpdateDialogComponent } from './subject-update-dialog/subject-update-dialog.component';
import Swal from 'sweetalert2';
import { CompetenceProgramSubjectService } from '../../core/services/competence-program-subject.service';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  providers: [SubjectService],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectService, private dialog: MatDialog, private router: Router, private modalService: NgbModal, private competenceProgramSubjectService: CompetenceProgramSubjectService ) { }
  ngOnInit() {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      }
    })
  } 

  viewSubject(subject: Subject) {
    this.router.navigate(['/home/asignaturas', subject.id]);
  }

  deleteSubject(subject: Subject) {
    Swal.fire({
    title: '¿Está seguro?',
    text: `¿Desea eliminar la asignatura "${subject.subjectName}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.subjectService.deleteSubject(subject.id, subject).subscribe({
        next: () => {
          this.subjects = this.subjects.filter(s => s.id !== subject.id);
          Swal.fire('Eliminado', 'La asignatura ha sido eliminada.', 'success');
        },
        error: (error) => {
          console.error('Error deleting subject:', error);
          Swal.fire('Error', 'No se pudo eliminar la asignatura.', 'error');
        }
      });
    }
  });
  }

  editSubject(subject: Subject) {
    const modalRef = this.modalService.open(SubjectUpdateDialogComponent, {
      size: 'lg', 
      centered: true,
    });
    modalRef.componentInstance.subject = subject;
    modalRef.result.then((result) => {
    if (result) {
        const { programCompetencesIds, ...subjectData } = result;
        this.subjectService.editSubject(subjectData.id, subjectData).subscribe({
        next: (updated) => {
          this.subjects = this.subjects.map(s => s.id === updated.id ? updated : s);
          console.log('Subject updated:', updated);
          Swal.fire('Asignatura Actualizada', `Asignatura ${updated.subjectName} actualizada con éxito`, 'success');
          // Asociar cada competencia seleccionada a la asignatura editada
          if (Array.isArray(programCompetencesIds) && programCompetencesIds.length > 0) {
            for (let i = 0; i < programCompetencesIds.length; i++) {
              console.log(`Asociando competencia ${programCompetencesIds[i]} con asignatura ${updated.id}`);
              this.competenceProgramSubjectService.postCompetenceProgramSubject(programCompetencesIds[i], updated.id).subscribe({
                next: (asociada) => {
                  console.log('Competencia asociada:', asociada);
                },
                error: (error) => {
                  console.error('Error associating competence:', error);
                }
              });
            }
          }
        },
        error: (error) => {
          console.error('Error editing subject:', error);
        }
        });
      }
    }, (reason) => {
      // Modal cerrado sin acción
    });
  }

  addSubject() {
  const modalRef = this.modalService.open(SubjectCreateDialogComponent, {
    size: 'lg',
    centered: true,
  });
  modalRef.result.then((result) => {
    if (result) {
      // 1. Guardar la asignatura
      const { programCompetencesIds, ...subjectData } = result;
      this.subjectService.postSubject(subjectData).subscribe({
        next: (created) => {
          console.log('Subject created:', created);
          this.subjects.push(created);
          Swal.fire('Nueva Asignatura', `Asignatura ${created.subjectName} creada con éxito`, 'success');
          // 2. Asociar cada competencia seleccionada a la asignatura creada
          if (Array.isArray(programCompetencesIds) && programCompetencesIds.length > 0) {
            for (let i = 0; i < programCompetencesIds.length; i++) {
              console.log(`Asociando competencia ${programCompetencesIds[i]} con asignatura ${created.id}`);
              this.competenceProgramSubjectService.postCompetenceProgramSubject(programCompetencesIds[i], created.id).subscribe({
                next: (asociada) => {
                  console.log('Competencia asociada:', asociada);
                },
                error: (error) => {
                  console.error('Error associating competence:', error);
                }
              });
            }
          }
        },
        error: (error) => {
          console.error('Error creating subject:', error);
        }
      });
    }
  }, (reason) => {
    // Modal cerrado sin acción
  });
  }
}
