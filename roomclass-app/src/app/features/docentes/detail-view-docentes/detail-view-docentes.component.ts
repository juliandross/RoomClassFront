import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher, TeacherInfo } from '../../../core/models/teacher';
import { GenericViewDetailsComponent } from '../../../shared/generic-view-details/generic-view-details.component';

@Component({
  selector: 'app-detail-view-docentes',
  templateUrl: './detail-view-docentes.component.html',
  standalone: true,
  imports: [GenericViewDetailsComponent]
})
export class DetailViewDocentesComponent implements OnInit {
  teacher: Teacher | null = null;
  item: any = null;


  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherService.getTeacherById(id).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
        this.item = {
          'Correo electrónico': teacher.email,
          'Identificación': teacher.identification,
          'Nombres': teacher.first_name,
          'Apellidos': teacher.last_name,
          'Tipo de identificación': teacher.teaTypeId,
          'Tipo de docente': teacher.teaType,
          'Título más reciente': teacher.teaRecentTitle
        };
      },
      error: (error) => {
        console.error('Error al obtener docente:', error);
      }
    });
  }
}