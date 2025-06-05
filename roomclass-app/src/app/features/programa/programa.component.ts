import { Component, OnInit } from '@angular/core';
import { ProgramCompetenceService } from '../../core/services/ProgramCompetence.service';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';
import { GenericViewDetailsComponent } from '../../shared/generic-view-details/generic-view-details.component';
import Swal from 'sweetalert2';
import { GenericViewCompetencesComponent } from "../../shared/generic-view-competences/generic-view-competences/generic-view-competences.component";
import { CompetenceMapperService } from '../../core/services/competence-mapper.service';

@Component({
  selector: 'app-program-competence-list',
  standalone: true,  
  imports: [GenericViewDetailsComponent, GenericViewCompetencesComponent],  
  templateUrl: './programa.component.html',
})
export class ProgramaComponent implements OnInit {
  competences: any[] = [];
  item: any;
  constructor(private programCompetenceService: ProgramCompetenceService,private competenceMapper:CompetenceMapperService) {}

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

  addCompetence(competence: any){
    // Aquí puedes abrir un modal o redirigir a una página de creación
    console.log('Agregar competencia');
    // Por ejemplo, podrías abrir un modal para crear una nueva competencia
  }
  editCompetence(competence: any) {
    // Aquí puedes abrir un modal o redirigir a una página de edición
    console.log('Editar competencia:', competence);
    // Por ejemplo, podrías abrir un modal para editar la competencia seleccionada
  }
  viewCompetence(competence: any) {
    // Aquí puedes mostrar un modal, navegar a detalles, etc.
    console.log('Competencia seleccionada:', competence);
    // Por ejemplo, puedes mostrar las RA asociadas:
    // competence.RA_Program
  }
  deleteCompetence(competence: any) {
    const competenceId = competence.id; 
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