// docentes.component.ts
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Teacher } from '../../core/models/teacher'
import { TeacherService } from '../../core/services/teacher.service';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { CreateViewDocentesComponent } from './create-view-docentes/create-view-docentes.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private teacherService: TeacherService, private modalService: NgbModal) {}
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
    // lógica para ver detalles
  }
  editTeacher(teacher: Teacher) {
    // lógica para editar
  }
  deleteTeacher(teacher: Teacher) {
    // lógica para eliminar
  }
  addTeacher() {
    this.modalRef = this.modalService.open(this.createDocenteModal, { size: 'lg' });
  }
}