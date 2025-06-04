import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class RegistryComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  submitted = false;
  baseUrl = 'http://localhost:8000/users/'; 

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      identification: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    // Agrega el rol por defecto antes de enviar
    const body = { ...this.registerForm.value, rol: 'COORDINADOR' };

    this.http.post(this.baseUrl, body).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado exitosamente'
        }).then(() => this.router.navigate(['/login']));
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.detail || 'Error al registrar usuario'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}