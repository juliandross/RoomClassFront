import { Component } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../core/models/subject';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from "../../shared/generic-list/generic-list.component";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectService) { }
  ngOnInit() {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      }
    })
  } 
  viewSubject($event: any) {
    throw new Error('Method not implemented.');
  }
  deleteSubject($event: any) {
    throw new Error('Method not implemented.');
  }
  editSubject($event: any) {
    throw new Error('Method not implemented.');
  }
  addSubect() {
    throw new Error('Method not implemented.');
  }
  
}
