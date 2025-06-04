import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-create-view-docentes',
  standalone: true,
  templateUrl: './create-view-docentes.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateViewDocentesComponent {
  @Output() onCreated = new EventEmitter<void>();

  docenteForm: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(private fb: FormBuilder, private teacherService: TeacherService) {
    this.docenteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      rol: [{ value: 'DOCENTE', disabled: true }, Validators.required],
      teaType: ['', Validators.required],
      teaTypeId: ['', Validators.required],
      teaRecentTitle: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.docenteForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = false;

    const body = {
      ...this.docenteForm.getRawValue(),
      rol: 'DOCENTE'
    };

    this.teacherService.createTeacher(body).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.onCreated.emit();
        this.docenteForm.reset({ rol: 'DOCENTE' });
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al crear docente';
        this.loading = false;
      }
    });
  }
}