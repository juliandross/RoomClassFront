import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher, TeacherInfo } from '../../../core/models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-view-docentes',
  standalone: true,
  templateUrl: './edit-view-docentes.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditViewDocentesComponent implements OnInit {
  @Input() teacherId!: number;
  @Output() onUpdated = new EventEmitter<void>();

  docenteForm: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(   private fb: FormBuilder,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router){
    this.docenteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: [''],
      teaType: ['', Validators.required],
      teaTypeId: ['', Validators.required],
      Titulo_mas_reciente: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtén el id desde la ruta
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.teacherId) {
      this.teacherService.getTeacherById(this.teacherId).subscribe({
        next: (teacher: Teacher) => {
          this.docenteForm.patchValue({
            email: teacher.email,
            first_name: teacher.first_name, 
            last_name: teacher.last_name, 
            password: '',
            teaType: teacher.teaType,
            teaTypeId: teacher.teaTypeId,
            Titulo_mas_reciente: teacher.teaRecentTitle,
          });
        }
      });
    }
  }
  onSubmit() {
    if (this.docenteForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = false;

    const body = {
      ...this.docenteForm.getRawValue()
    };

    this.teacherService.editTeacher(this.teacherId, body).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Docente actualizado!',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
        this.onUpdated.emit();
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al editar docente';
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.error,
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}