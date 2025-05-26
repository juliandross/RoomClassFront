import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: User | null = null;
  constructor(private authService: AuthService) {}
  // This method is called when the component is initialized, it obtains the user credentials
  ngOnInit() {
      this.authService.getProfile().subscribe({
        next: (user) => {
          this.user = user;
        }
      });
    }
  logout() {
    this.authService.logout();    
  }
}


