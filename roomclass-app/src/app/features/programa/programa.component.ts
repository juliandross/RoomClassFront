import { Component, OnInit } from '@angular/core';
import { ProgramCompetenceService } from '../../core/services/ProgramCompetence.service';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';

@Component({
  selector: 'app-program-competence-list',
  standalone: true,
  template: `
    <app-generic-list
      [name]="'Competencias de Programa'"
      [nameAtribute]="'proCompDescription'"
      [items]="competences"
      [showViewButton]="true"
      (onView)="viewCompetence($event)">
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

  viewCompetence(competence: any) {
    // Aquí puedes mostrar un modal, navegar a detalles, etc.
    console.log('Competencia seleccionada:', competence);
    // Por ejemplo, puedes mostrar las RA asociadas:
    // competence.RA_Program
  }
}