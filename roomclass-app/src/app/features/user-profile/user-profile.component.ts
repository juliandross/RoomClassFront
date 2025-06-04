import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  providers: [AuthService, UserService],
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
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información del usuario';
        this.loading = false;
      }
    });
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