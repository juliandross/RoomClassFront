import { Component } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../core/models/subject';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from "../../shared/generic-list/generic-list.component";
import { SubjectCreateDialogComponent } from './subject-create-dialog/subject-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  providers: [SubjectService],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectService, private dialog: MatDialog) { }
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

  viewSubject(subject: Subject) {
    this.subjectService.viewSubject(subject.id).subscribe({
      next: (result) => {
        // Aquí puedes mostrar los detalles en un modal o similar
        console.log('Subject details:', result);
      },
      error: (error) => {
        console.error('Error viewing subject:', error);
      }
    });
  }

  deleteSubject(subject: Subject) {
    this.subjectService.deleteSubject(subject.id, subject).subscribe({
      next: () => {
        // Elimina el subject de la lista local
        this.subjects = this.subjects.filter(s => s.id !== subject.id);
        console.log('Subject deleted');
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
      }
    });
  }

  editSubject(subject: Subject) {
    this.subjectService.editSubject(subject.id, subject).subscribe({
      next: (updated) => {
        // Actualiza el subject en la lista local
        this.subjects = this.subjects.map(s => s.id === subject.id ? updated : s);
        console.log('Subject updated:', updated);
      },
      error: (error) => {
        console.error('Error editing subject:', error);
      }
    });
  }
  addSubject() {
    const dialogRef = this.dialog.open(SubjectCreateDialogComponent, {
      width: '80vw',
      maxWidth: '900px',
      position: { top: '30' },
      panelClass: 'dialog-centered',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.postSubject(result).subscribe({
          next: (created) => this.subjects.push(created)
        });
      }
    });
  }
}
