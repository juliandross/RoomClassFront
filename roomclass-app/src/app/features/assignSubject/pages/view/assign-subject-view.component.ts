import { Component } from '@angular/core';
import { GenericViewDetailsComponent } from "../../../../shared/generic-view-details/generic-view-details.component";
import { AssignSubjectService } from '../../../../core/services/assign-subject.service';
import { SubjectCompetenceService } from '../../../../core/services/subject-competence.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GenericViewCompetencesComponent } from "../../../../shared/generic-view-competences/generic-view-competences/generic-view-competences.component";
import { CompetenceMapperService, CompetenceWrapper } from '../../../../core/services/competence-mapper.service';


@Component({
  selector: 'app-assign-subject-view',
  standalone: true,
  imports: [GenericViewDetailsComponent, GenericViewCompetencesComponent,RouterModule],
  templateUrl: './assign-subject-view.component.html',
  styleUrl: './assign-subject-view.component.css'
})
export class AssignSubjectViewComponent {  
  competences: CompetenceWrapper[] = [];
  item: any;
  constructor(
    private assignSubjectService:AssignSubjectService,
    private subjectCompetenceService: SubjectCompetenceService,
    private competenceMapper: CompetenceMapperService,
    private router: Router,
    private route: ActivatedRoute) { }
    id = this.route.snapshot.paramMap.get('id');
  ngOnInit() {    
    if (this.id) {
      this.assignSubjectService.getAssignSubjectById(+this.id).subscribe({
        next: (assignSubject) => {          
          this.item ={
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
                return this.competenceMapper.mapSubjectCompetenceToCompetenceWrapper(competence);
              })
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

}
