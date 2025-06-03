import { Component } from '@angular/core';
import { GenericViewDetailsComponent } from "../../../../shared/generic-view-details/generic-view-details.component";
import { AssignSubject } from '../../../../core/models/assign-subject';
import { SubjectCompetence } from '../../../../core/models/subject-competence';
import { AssignSubjectService } from '../../../../core/services/assign-subject.service';
import { SubjectCompetenceService } from '../../../../core/services/subject-competence.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectCompetenceWrapper } from '../../../../core/models/subject-competence-wrapper';

@Component({
  selector: 'app-assign-subject-view',
  standalone: true,
  imports: [GenericViewDetailsComponent],
  providers: [AssignSubjectService, SubjectCompetenceService],
  templateUrl: './assign-subject-view.component.html',
  styleUrl: './assign-subject-view.component.css'
})
export class AssignSubjectViewComponent {
  assignSubject : AssignSubject = new AssignSubject();
  competences: SubjectCompetenceWrapper[] = [];
  constructor(
    private assignSubjectService:AssignSubjectService,
    private subjectCompetenceService: SubjectCompetenceService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assignSubjectService.getAssignSubjectById(+id).subscribe({
        next: (assignSubject) => {
          this.assignSubject = assignSubject;
          this.subjectCompetenceService.getCompetencesBySubjectId(assignSubject.subject.id).subscribe({
            next: (competences) => {
              this.competences = competences;
                console.log(competences);
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

}
