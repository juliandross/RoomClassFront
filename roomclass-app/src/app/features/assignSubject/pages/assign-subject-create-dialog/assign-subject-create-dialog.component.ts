import { Component } from '@angular/core';
import { Teacher } from '../../../../core/models/teacher';
import { Period } from '../../../../core/models/period';
import { Subject } from '../../../../core/models/subject';
import { TeacherService } from '../../../../core/services/teacher.service';
import { PeriodService } from '../../../../core/services/period.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-subject-create-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-subject-create-dialog.component.html',
  styleUrl: './assign-subject-create-dialog.component.css'
})
export class AssignSubjectCreateDialogComponent {
  teachers: Teacher[] = [];
  periods: Period[] = [];
  subjects: Subject[] = [];
  selectedTeacherId?: number;
  selectedPeriodId?: number;
  selectedSubjectId?: number;

  constructor(private teacherService: TeacherService, private periodService: PeriodService, private subjectService: SubjectService, public activeModal: NgbActiveModal) {}
  
  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
    this.periodService.getPeriods().subscribe(periods => this.periods = periods);
    this.subjectService.getSubjects().subscribe(subjects => this.subjects = subjects);
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onAssign() {
    this.activeModal.close({
      subjectId: this.selectedSubjectId,
      teacherId: this.selectedTeacherId,
      periodId: this.selectedPeriodId
    });
  }
}
