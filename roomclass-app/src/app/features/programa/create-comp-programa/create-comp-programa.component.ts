import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgramCompetence } from '../../../core/models/ProgramCompetence';

@Component({
  selector: 'app-create-comp-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-comp-programa.component.html',
  styleUrl: './create-comp-programa.component.css'
})
export class CreateCompProgramaComponent {
  competence: Partial<ProgramCompetence> = {
    proCompDescription: '',
    proCompLevel: ''
  };

  constructor(private dialogRef: MatDialogRef<CreateCompProgramaComponent>) {}

  onSave() {
    this.dialogRef.close(this.competence);
  }

  onCancel() {
    this.dialogRef.close();
  }
}