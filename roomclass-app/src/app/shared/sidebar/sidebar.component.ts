import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: User | null = null;
  isCoordinador = false;

  constructor(private storageService: StorageService,private authService:AuthService, private router: Router) {}
  // This method is called when the component is initialized, it obtains the user credentials
  ngOnInit() {
      this.user = this.storageService.getUser();
      this.isCoordinador = !!this.user && (this.user.rol || '').trim().toUpperCase() === 'COORDINADOR';      
    }
  logout() {
    this.authService.logout();    
  }

  goToUserManagement() {
    this.router.navigate(['/home/perfil']);
  }
}


