import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../core/services/subject.service';
import { GenericViewDetailsComponent } from "../../../shared/generic-view-details/generic-view-details.component";
import { CompetenceWrapper } from '../../../core/services/competence-mapper.service';

@Component({
  selector: 'app-subject-detail-view',
  templateUrl: './subject-detail-view.component.html',
  standalone: true,
  imports: [GenericViewDetailsComponent]
})
export class SubjectDetailViewComponent implements OnInit {

  subject: any;
  competences: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subjectService.viewSubject(id).subscribe({
      next: (subject) => {
        console.log('Subject recibido:', subject);
        this.subject = {
          Id: subject.id,
          Nombre: subject.subjectName,          
          Descripción: subject.subjectDescription,
          Semestre: subject.subjectSemester,
          Creditos: subject.subjectCredits,                    
        };
      }
    });
  }

}