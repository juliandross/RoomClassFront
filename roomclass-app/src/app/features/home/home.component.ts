import { Component } from '@angular/core';
import { AuthService, User } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | null = null;
    constructor(private authService:AuthService) {}
    // This method is called when the component is initialized, it obtains the user credentials
    ngOnInit() {
        this.authService.getProfile().subscribe({
          next: (user) => {
            this.user = user;
          }
        });
      }
}
