import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: User | null = null;
  isCoordinador = false;

  constructor(private authService: AuthService, private router: Router) {}
  // This method is called when the component is initialized, it obtains the user credentials
  ngOnInit() {
      this.authService.getProfile().subscribe({
        next: (user) => {
          this.user = user;
          this.isCoordinador = (user.rol || '').trim().toUpperCase() === 'COORDINADOR';
        }
      });
      console.log('User profile loaded:', this.user);
    }
  logout() {
    this.authService.logout();    
  }

  goToUserManagement() {
    this.router.navigate(['/home/perfil'], { queryParams: { userId: this.user?.id } });
  }
}


