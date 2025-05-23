import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],  
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;  
  //Initializes the login form with FormBuilder
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //Handles the login form submission
  onSubmit() {
    if (this.loginForm.invalid){
      console.log('Login form is invalid');
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    } 
    const { username, password } = this.loginForm.value;
    //Here we send the login data to the server
    this.authService.login(username, password).subscribe({
    next: () => {
      console.log('Login successful', this.loginForm.value);      
      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido de vuelta!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.authService.getProfile().subscribe(() => {
        this.router.navigate(['/home']);
      });      
    }); 
    },
    error: (er) => {
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas',
        icon: 'error',
        confirmButtonText: 'OK'
      });      
      console.log('Login failed');
      this.loginForm.reset();
    }
  });             
  }
}

