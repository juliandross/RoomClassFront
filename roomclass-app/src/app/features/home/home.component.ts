import { Component } from '@angular/core';
import { AuthService} from '../../core/auth/auth.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | null = null;
    constructor(private authService:AuthService) {}
    // This method is called when the component is initialized, it obtains the user credentials
    ngOnInit() {
        this.authService.getProfile().subscribe({
        next: user => {
          this.user = user;
        }
  });
      }
}
