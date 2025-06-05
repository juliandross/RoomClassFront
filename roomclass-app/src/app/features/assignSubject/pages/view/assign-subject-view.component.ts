import { Component } from '@angular/core';
import { GenericViewDetailsComponent } from "../../../../shared/generic-view-details/generic-view-details.component";
import { AssignSubjectService } from '../../../../core/services/assign-subject.service';
import { SubjectCompetenceService } from '../../../../core/services/subject-competence.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GenericViewCompetencesComponent } from "../../../../shared/generic-view-competences/generic-view-competences/generic-view-competences.component";
import { CompetenceMapperService, CompetenceWrapper } from '../../../../core/services/competence-mapper.service';
import Swal from 'sweetalert2';
import { EditSubjectCompetenceComponent } from '../../../assignCompetence/edit-competence/edit-competence.component';
import { CompetenceProgramSubject } from '../../../../core/models/competence-program-subject';
import { AddSubjectCompetenceComponent } from '../../../assignCompetence/add-competence/add-competence.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectCompetence } from '../../../../core/models/subject';
import { ProgramCompetence } from '../../../../core/models/ProgramCompetence';
import { ProgramCompetenceService } from '../../../../core/services/ProgramCompetence.service';

@Component({
  selector: 'app-assign-subject-view',
  standalone: true,
  imports: [GenericViewDetailsComponent, GenericViewCompetencesComponent, RouterModule],
  templateUrl: './assign-subject-view.component.html',
  styleUrl: './assign-subject-view.component.css'
})
export class AssignSubjectViewComponent {

  programCompetences: ProgramCompetence[] = [];
  competences: CompetenceWrapper[] = [];
  item: any;
  id: string | null;

  constructor(
    private assignSubjectService: AssignSubjectService,
    private subjectCompetenceService: SubjectCompetenceService,
    private competenceMapper: CompetenceMapperService,
    private programCompetenceService: ProgramCompetenceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    // Cargar competencias de programa reales para el selector
    this.programCompetenceService.getProgramCompetences().subscribe({
      next: (pcs) => {
        // Si pcs es un array de envolturas, extrae solo el objeto ProgramCompetence
        this.programCompetences = pcs.map((x: any) => x.competenceProgram);
      }
    });

    if (this.id) {
      this.assignSubjectService.getAssignSubjectById(+this.id).subscribe({
        next: (assignSubject) => {
          this.item = {
            Materia: assignSubject.subject.subjectName,
            Descripción: assignSubject.subject.subjectDescription,
            Creditos: assignSubject.subject.subjectCredits,
            Semestre: assignSubject.subject.subjectSemester,
            Profesor: assignSubject.teacher.first_name + ' ' + assignSubject.teacher.last_name,
            Periodo: assignSubject.period.perSemester,
          }
          this.subjectCompetenceService.getCompetencesBySubjectId(assignSubject.subject.id).subscribe({
            next: (competences) => {
              // Map the competences to the CompetenceWrapper format
              this.competences = competences.map(competence => {
                console.log('Competences for view:', this.competences);
                return this.competenceMapper.mapSubjectCompetenceToCompetenceWrapper(competence);
              })
              console.log('Competences for view:', this.competences);
            },
            error: (error) => {
              console.error('Error fetching competences:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching assign subject:', error);
        }
      });
    }
  }

  viewRA(raId: number) {
    this.router.navigate(['home/asignar_materia/view/', this.id, 'viewRA', raId]);
  }

  deleteRA(raId: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el Resultado de Aprendizaje con ID ${raId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignSubjectService.deleteRA(raId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El Resultado de Aprendizaje ha sido eliminado.', 'success');
            // Refresh competences
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error deleting RA:', error);
            Swal.fire('Error', 'No se pudo eliminar el Resultado de Aprendizaje.', 'error');
          }
        });
      }
    });
  }

  editRA($event: any) {
    throw new Error('Method not implemented.');
  }

  addRA($event: any) {
    throw new Error('Method not implemented.');
    }
  addCompetence() {
    const modalRef = this.modalService.open(AddSubjectCompetenceComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.programCompetences = this.programCompetences;
    modalRef.componentInstance.selectedProgramCompetenceId = null;
    modalRef.result.then((result) => {
      if (result) {
        this.subjectCompetenceService.createSubjectCompetence(
          result.compDescription,
          result.compLevel,
          result.programCompetence,
          this.id ? +this.id : 0 // subjectTeacherPeriod
        ).subscribe({
          next: () => {
            Swal.fire('Competencia agregada', 'La competencia fue agregada con éxito', 'success')
              .then(() => this.ngOnInit());
          },
          error: () => {
            Swal.fire('Error', 'No se pudo agregar la competencia', 'error');
          }
        });
      }
    }).catch(() => {});
  }
  editCompetence(subjectCompetence: CompetenceProgramSubject) {
    const modalRef = this.modalService.open(EditSubjectCompetenceComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.programCompetences = this.programCompetences;
    modalRef.componentInstance.subjectCompetence = { ...subjectCompetence };

    modalRef.result.then((result) => {
      if (result) {
        this.subjectCompetenceService.updateSubjectCompetence(
          result.id,
          {
            ...result,
            subject: this.id ? +this.id : undefined
          }
        ).subscribe({
          next: () => {
            Swal.fire('Competencia actualizada', 'La competencia fue actualizada con éxito', 'success')
              .then(() => this.ngOnInit());
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar la competencia', 'error');
          }
        });
      }
    }).catch(() => {});
  }
  deleteCompetence(subjectCompetence_id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar la competencia con ID ${subjectCompetence_id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectCompetenceService.deleteSubjectCompetence(subjectCompetence_id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La competencia ha sido eliminada.', 'success');
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error deleting competence:', error);
            Swal.fire('Error', 'No se pudo eliminar la competencia.', 'error');
          }
        });
      }
    });
  }
}