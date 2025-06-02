import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from '../../../core/models/subject';
import { GenericViewDetailsComponent } from "../../../shared/generic-view-details/generic-view-details.component";

@Component({
  selector: 'app-subject-detail-view',
  templateUrl: './subject-detail-view.component.html',
  standalone: true,
  imports: [GenericViewDetailsComponent]
})
export class SubjectDetailViewComponent implements OnInit {

  subject: Subject | null = null;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subjectService.viewSubject(id).subscribe({
      next: (subject) => {
        console.log('Subject recibido:', subject);
        this.subject = subject;
      }
    });
  }

}