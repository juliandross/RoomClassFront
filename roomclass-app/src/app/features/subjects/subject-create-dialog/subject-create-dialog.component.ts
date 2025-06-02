import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../../core/models/subject';

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

  constructor(
    private dialogRef: MatDialogRef<SubjectCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.subject = { ...data };
    }
  }

  onSave() {
    this.dialogRef.close(this.subject);
  }

  onCancel() {
    this.dialogRef.close();
  }
}