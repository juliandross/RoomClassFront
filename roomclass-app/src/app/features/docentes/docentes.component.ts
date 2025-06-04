// docentes.component.ts
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../core/models/teacher'
import { TeacherService } from '../../core/services/teacher.service';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css',
  standalone: true,
  imports: [GenericListComponent]
})
export class DocentesComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => this.teachers = teachers
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
    // lógica para agregar
  }
}