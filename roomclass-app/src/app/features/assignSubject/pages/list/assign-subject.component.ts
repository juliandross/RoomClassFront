import { Component } from '@angular/core';
import { GenericListComponent } from "../../../../shared/generic-list/generic-list.component";
import { AssignSubject } from '../../../../core/models/assign-subject';
import { AssignSubjectService } from '../../../../core/services/assign-subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-subject',
  standalone: true,
  imports: [GenericListComponent],  
  templateUrl: './assign-subject.component.html',
  styleUrl: './assign-subject.component.css'
})
export class AssignSubjectComponent {
assignSubjects: AssignSubject[] = [];
constructor(private assignSubjectService: AssignSubjectService,private router:Router) { }
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
  viewAssignSubject(assignSubject: AssignSubject) {
    this.router.navigate(['home/asignar_materia/view/', assignSubject.id]);
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
