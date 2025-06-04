import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../../core/models/subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../../core/models/teacher';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-subject-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-update-dialog.component.html',
  styleUrl: './subject-update-dialog.component.css'
})
export class SubjectUpdateDialogComponent {
   @Input() subject!: Subject;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.subject = { ...this.subject };
  }

  onSave() {
    this.activeModal.close(this.subject);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
