import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../../core/models/subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models/teacher';

@Component({
  selector: 'app-subject-create-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-create-dialog.component.html',
  styleUrl: './subject-create-dialog.component.css'
})
export class SubjectCreateDialogComponent {
  subject: Partial<Subject> = {
    subjectName: '',
    subjectDescription: '',
    subjectCredits: 1,
    subjectSemester: 1,
    is_active: true
  };
  teachers: Teacher[] = [];
  selectedTeacherId?: number;
  
  constructor(public activeModal: NgbActiveModal, private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(
      teachers => this.teachers = teachers
    );
  }

  onSave() {
    this.activeModal.close({
      ...this.subject,
      teacherId: this.selectedTeacherId
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}