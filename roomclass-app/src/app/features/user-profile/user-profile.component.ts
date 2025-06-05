import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../core/services/storage-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',  
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  success = false;
  error = '';
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private userService: UserService
  ) {
  this.userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  ngOnInit() {
    this.loading = true;
      this.user = this.storageService.getUser();      
  }

  onSubmit() {
    if (this.userForm.invalid || !this.user?.id) return;
    this.loading = true;
    this.error = '';
    this.success = false;

    const body = {
      ...this.userForm.getRawValue()
    };

    this.userService.updateUser(this.user.id, body).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Perfil actualizado!',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al actualizar usuario';
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.error,
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}