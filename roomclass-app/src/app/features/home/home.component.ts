import { Component } from '@angular/core';
import { AuthService} from '../../core/auth/auth.service';
import { User } from '../../core/models/user';
import { StorageService } from '../../core/services/storage-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | null = null;
    constructor(private storageService:StorageService) {}
    // This method is called when the component is initialized, it obtains the user credentials
    ngOnInit() {
        this.user = this.storageService.getUser();  
      }
}
