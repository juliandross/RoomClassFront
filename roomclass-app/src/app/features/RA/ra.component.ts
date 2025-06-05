import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericViewDetailsComponent } from '../../shared/generic-view-details/generic-view-details.component';
import { AssignSubjectService } from '../../core/services/assign-subject.service';

@Component({
  selector: 'app-ra',
  standalone: true,
  imports: [GenericViewDetailsComponent],
  templateUrl: './ra.component.html',
  styleUrl: './ra.component.css'
})
export class RaComponent {
  constructor(private route:ActivatedRoute, private assignSubjectService:AssignSubjectService) { }
  raId = this.route.snapshot.paramMap.get('raId');
  item: any;
  ngOnInit() {
    if (this.raId) {
      this.assignSubjectService.getRAById(+this.raId).subscribe({
        next: (ra) => {
          this.item = {
            'ID': ra.id,
            'Descripción': ra.raDescription,            
          };
        }
      })
    }
  }
}

