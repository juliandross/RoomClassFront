import { Component } from '@angular/core';
import { GenericListComponent } from "../../shared/generic-list/generic-list.component";
import { AssignSubject } from '../../core/models/assign-subject';
import { AssignSubjectService } from '../../core/services/assign-subject.service';

@Component({
  selector: 'app-assign-subject',
  standalone: true,
  imports: [GenericListComponent],
  providers: [AssignSubjectService],
  templateUrl: './assign-subject.component.html',
  styleUrl: './assign-subject.component.css'
})
export class AssignSubjectComponent {
assignSubjects: AssignSubject[] = [];
constructor(private assignSubjectService: AssignSubjectService) { }
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
viewAssignSubject($event: any) {
throw new Error('Method not implemented.');
}
deleteAssignSubject($event: any) {
throw new Error('Method not implemented.');
}
editAssignSubject($event: any) {
throw new Error('Method not implemented.');
}
addAssignSubject() {
throw new Error('Method not implemented.');
}

}
