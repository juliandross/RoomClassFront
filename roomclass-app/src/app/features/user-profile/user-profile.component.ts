import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      rol: [{ value: '', disabled: true }],
      is_active: [{ value: '', disabled: true }],
      is_staff: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe({
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
    if (this.userForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = false;

    const body = {
      ...this.userForm.getRawValue()
    };

    this.userService.updateCurrentUser(body).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al actualizar usuario';
        this.loading = false;
      }
    });
  }
}