import { Component, model } from '@angular/core';
import { GenericListComponent } from "../../../../shared/generic-list/generic-list.component";
import { AssignSubject } from '../../../../core/models/assign-subject';
import { AssignSubjectService } from '../../../../core/services/assign-subject.service';
import { Router } from '@angular/router';
import { AssignSubjectCreateDialogComponent } from '../assign-subject-create-dialog/assign-subject-create-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { error } from 'console';
import { PeriodService } from '../../../../core/services/period.service';
import { TeacherService } from '../../../../core/services/teacher.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { Subject } from '../../../../core/models/subject';
import { Teacher } from '../../../../core/models/teacher';
import { Period } from '../../../../core/models/period';
@Component({
  selector: 'app-assign-subject',
  standalone: true,
  imports: [GenericListComponent],  
  templateUrl: './assign-subject.component.html',
  styleUrl: './assign-subject.component.css'
})
export class AssignSubjectComponent {
assignSubjects: AssignSubject[] = [];
assignSubjectFull!: AssignSubject;
subject!: Subject;
period!: Period;
teacher!: Teacher;

constructor(private assignSubjectService: AssignSubjectService,private router:Router, private modelService: NgbModal,
  private teacherService: TeacherService, private periodService: PeriodService, private subjectService: SubjectService
) { }
  ngOnInit() {
    this.assignSubjectService.getAssignSubjects().subscribe({
      next: (assignSubjects) => {
        this.assignSubjects = assignSubjects;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      }
    })
  }
  viewAssignSubject(assignSubject: AssignSubject) {
    this.router.navigate(['home/asignar_materia/view/', assignSubject.id]);
  }
  deleteAssignSubject(assignSubject: AssignSubject) {
    Swal.fire({
        title: '¿Está seguro?',
        text: `¿Desea eliminar la asignacion?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.assignSubjectService.deleteAssignSubject(assignSubject.id).subscribe({
            next: () => {
              this.assignSubjects = this.assignSubjects.filter(s=> s.id !== assignSubject.id);
              Swal.fire('Eliminada', 'La asignacion ha sido eliminada.', 'success');
            },
            error: (error) => {
              console.error('Error deleting subject:', error);
              Swal.fire('Error', 'No se pudo eliminar la asignatura.', 'error');
            }
          });
        }
      });
  }

  editAssignSubject($event: any) {
  throw new Error('Method not implemented.');
  }
  
  addAssignSubject() {
    const modelRef = this.modelService.open(AssignSubjectCreateDialogComponent, {
      size: 'lg',
      centered: true,
    });
    modelRef.result.then((result) => {
      if(result){
        const {subjectId, teacherId, periodId} = result;
        this.assignSubjectService.postAssignSubject(subjectId, teacherId, periodId).subscribe({
          next: (assignSubject) => {
            //arreglar
            this.assignSubjects.push(assignSubject);
            console.log('Asignación creada:', assignSubject);
            Swal.fire('Nueva delegación de asignatura', `Asignatura delegada con éxito`, 'success');
            //REFRESH
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error delegation subject:', error);
          }
        });
      }
    }, (reason) => {
      // Modal cerrado sin acción
    });
  }
  
}
