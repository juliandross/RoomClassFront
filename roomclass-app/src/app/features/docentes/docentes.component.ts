// docentes.component.ts
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Teacher } from '../../core/models/teacher'
import { TeacherService } from '../../core/services/teacher.service';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { CreateViewDocentesComponent } from './create-view-docentes/create-view-docentes.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css',
  standalone: true,
  imports: [GenericListComponent, CreateViewDocentesComponent]
})
export class DocentesComponent implements OnInit {
  teachers: Teacher[] = [];
  modalRef?: NgbModalRef;
  constructor(private teacherService: TeacherService, private modalService: NgbModal, private router: Router) {}
  @ViewChild('createDocenteModal') createDocenteModal!: TemplateRef<any>;
  ngOnInit() {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        // Combina nombre, apellido y teaRecentTitle en una propiedad temporal
        this.teachers = teachers.map(t => ({
          ...t,
          displayName: `${t.first_name} ${t.last_name} (${t.teaRecentTitle || ''} - ${t.teaType})`
        }));
      }
    });
  }
  refreshTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers.map(t => ({
          ...t,
          displayName: `${t.first_name} ${t.last_name} (${t.teaRecentTitle || ''} - ${t.teaType})`
        }));
      }
    });
  }
  viewTeacher(teacher: Teacher) {
    this.router.navigate(['/home/docentes', teacher.id]);
  }
  editTeacher(teacher: Teacher) {
    // lógica para editar
  }
  unactivateTeacher(teacher: Teacher) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al docente ${teacher.first_name} ${teacher.last_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.unactivateTeacher(teacher.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El docente ha sido eliminado exitosamente', 'success');
            this.refreshTeachers();
          },
          error: (err) => {
            Swal.fire('Error', err.error?.detail || 'Error al eliminar el docente', 'error');
          }
        });
      }
    });
  }
  addTeacher() {
    this.modalRef = this.modalService.open(this.createDocenteModal, { size: 'lg' });
  }
  showSuccessSnack() {
    Swal.fire({
      icon: 'success',
      title: 'Operación exitosa',
      text: 'El docente ha sido creado exitosamente'
    }).then(() => {
      this.modalRef?.close();
      this.refreshTeachers();
    });
  }
}