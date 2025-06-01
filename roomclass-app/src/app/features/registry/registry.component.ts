import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  baseUrl = 'http://localhost:8000/users/'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.http.post(this.baseUrl, this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        this.registerForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar usuario';
        this.successMessage = '';
      }
    });
  }
}