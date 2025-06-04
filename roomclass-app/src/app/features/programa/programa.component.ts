import { Component, OnInit } from '@angular/core';
import { ProgramCompetenceService } from '../../core/services/ProgramCompetence.service';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program-competence-list',
  standalone: true,
  template: `
    <app-generic-list
      [name]="'Competencias de Programa'"
      [nameAtribute]="'proCompDescription'"
      [items]="competences"
      [showViewButton]="true"
      (onView)="viewCompetence($event)"
      (onAdd)="addCompetence($event)"
      (onEdit)="editCompetence($event)"
      (onDelete)="deleteCompetence($event)">
    </app-generic-list>
  `,
  imports: [GenericListComponent]
})
export class ProgramaComponent implements OnInit {
  competences: any[] = [];

  constructor(private programCompetenceService: ProgramCompetenceService) {}

  ngOnInit() {
    this.programCompetenceService.getProgramCompetences().subscribe({
      next: (data) => {
        // Extrae el objeto competenceProgram y le añade el array RA_Program para mostrarlo en la lista
        this.competences = data.map(item => ({
          ...item.competenceProgram,
          RA_Program: item.RA_Program
        }));
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