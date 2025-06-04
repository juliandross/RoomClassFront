import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { TeacherInfo } from '../../../core/models/teacher';
import { GenericViewDetailsComponent } from '../../../shared/generic-view-details/generic-view-details.component';

@Component({
  selector: 'app-detail-view-docentes',
  templateUrl: './detail-view-docentes.component.html',
  standalone: true,
  imports: [GenericViewDetailsComponent]
})
export class DetailViewDocentesComponent implements OnInit {
  teacher: TeacherInfo | null = null;
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
          'Identificación': teacher.identificacion,
          'Nombres': teacher.Nombres,
          'Apellidos': teacher.Apellidos,
          'Tipo de identificación': teacher.Tipo_de_identificacion,
          'Tipo de docente': teacher.tipo_de_docente,
          'Título más reciente': teacher.Titulo_mas_reciente
        };
      },
      error: (error) => {
        console.error('Error al obtener docente:', error);
      }
    });
  }
}