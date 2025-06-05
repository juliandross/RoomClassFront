import { Component, OnInit } from '@angular/core';
import { ProgramCompetenceService } from '../../core/services/ProgramCompetence.service';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';
import { GenericViewDetailsComponent } from '../../shared/generic-view-details/generic-view-details.component';
import Swal from 'sweetalert2';
import { GenericViewCompetencesComponent } from "../../shared/generic-view-competences/generic-view-competences/generic-view-competences.component";
import { CompetenceMapperService } from '../../core/services/competence-mapper.service';
import { CreateCompProgramaComponent } from './create-comp-programa/create-comp-programa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCompProgramaComponent } from './edit-comp-programa/edit-comp-programa.component';
@Component({
  selector: 'app-program-competence-list',
  standalone: true,  
  imports: [GenericViewDetailsComponent, GenericViewCompetencesComponent], 
     
  templateUrl: './programa.component.html',
})
export class ProgramaComponent implements OnInit {
  competences: any[] = [];
  item: any;
  constructor(private programCompetenceService: ProgramCompetenceService,
    private competenceMapper:CompetenceMapperService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.item = {
      Programa: 'Ingeniería de Sistemas',
      Descripción: 'Carrera enfocada en el desarrollo de software y sistemas computacionales.',
      Creditos: 180,
      Duración: '9 semestres',
      Coordinador: 'Dr. Juan Pérez',      
    }
    this.programCompetenceService.getProgramCompetences().subscribe({
      next: (competences) => {
        // Map the competences to the CompetenceWrapper format
        this.competences = competences.map(competence => {
        return this.competenceMapper.mapProgramCompetenceToCompetenceWrapper(competence);
        })
      }
    });
  }

  
  addCompetence() {
    const modalRef = this.modalService.open(CreateCompProgramaComponent, {
      size: 'lg', // o 'md', según prefieras
      centered: true,
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      if (result) {
        this.programCompetenceService.createProgramCompetence(result).subscribe({
          next: (created) => {
            console.log('Competencia creada:', created);
            Swal.fire('Competencia creada', 'La competencia fue creada con éxito', 'success')
              .then(() => this.ngOnInit()); // Refresca después del Swal
          },
          error: (err) => {
            console.error('Error al crear competencia:', err);
            Swal.fire('Error', 'No se pudo crear la competencia', 'error');
          }
        });
      }
    }).catch(() => {});
  }
  editCompetence(competenceId: number) {
    // Busca el objeto competencia en el array
    const competenceWrapper = this.competences.find(c => c.competence.id === competenceId);
    if (!competenceWrapper) {
      Swal.fire('Error', 'No se encontró la competencia', 'error');
      return;
    }

    // Pasa una copia del objeto competencia al modal
    const modalRef = this.modalService.open(EditCompProgramaComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.competence = { ...competenceWrapper.competence };

    modalRef.result.then((result) => {
      if (result) {
        this.programCompetenceService.updateProgramCompetence(result.id, result).subscribe({
          next: (updated) => {
            Swal.fire('Competencia actualizada', 'La competencia fue actualizada con éxito', 'success')
              .then(() => this.ngOnInit());
          },
          error: (err) => {
            err = err.error || err;
            Swal.fire('Error', err.message || err.detail || 'Error desconocido', 'error');
          }
        });
      }
    }).catch(() => {});
  }
  viewCompetence(competence: any) {
    // Aquí puedes mostrar un modal, navegar a detalles, etc.
    console.log('Competencia seleccionada:', competence);
    // Por ejemplo, puedes mostrar las RA asociadas:
    // competence.RA_Program
  }

  onAddRA(competenceId: number) {
    // Lógica para crear RA
  }

  onEditRA(raId: number) {
    // Lógica para editar RA
  }

  onDeleteRA(raId: number) {
    // Lógica para eliminar RA
  }

  onViewRA(raId: number) {
    // Lógica para mostrar RA
  }
  deleteCompetence(competenceId: number) {
    console.log('Eliminar competencia con ID:', competenceId);
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta competencia del programa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.programCompetenceService.deleteProgramCompetence(competenceId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La competencia ha sido eliminada.', 'success');
            this.ngOnInit(); // Refresca la lista
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la competencia.', 'error');
          }
        });
      }
    });
  }
}