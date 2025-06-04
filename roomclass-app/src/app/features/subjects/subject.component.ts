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
  constructor(private subjectService: SubjectService, private dialog: MatDialog, private router: Router, private modalService: NgbModal ) { }
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
    this.subjectService.deleteSubject(subject.id, subject).subscribe({
      next: () => {
        // Elimina el subject de la lista local
        this.subjects = this.subjects.filter(s => s.id !== subject.id);
        console.log('Subject deleted');
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
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
        this.subjectService.editSubject(result.id, result).subscribe({
        next: (updated) => {
          this.subjects = this.subjects.map(s => s.id === updated.id ? updated : s);
          console.log('Subject updated:', updated);
          Swal.fire('Asignatura Actualizada', `Asignatura ${updated.subjectName} actualizada con éxito`, 'success');
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
      // 1. Guardar la asignatura (sin el teacherId)
      const { teacherId, ...subjectData } = result;
      this.subjectService.postSubject(subjectData).subscribe({
        next: (created) => {
          console.log('Subject created:', created);
          this.subjects.push(created);
          Swal.fire('Nueva Asignatura', `Asignatura ${created.subjectName} creada con éxito`, 'success')
        }
      });
    }
    }, (reason) => {
    // Modal cerrado sin acción
    });
  }  
}
