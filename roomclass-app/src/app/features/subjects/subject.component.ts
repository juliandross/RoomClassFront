import { Component } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../core/models/subject';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
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
  
}
