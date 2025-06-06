import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { StorageService } from '../../../../core/services/storage-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],    
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;  
  //Initializes the login form with FormBuilder
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService, private storage: StorageService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
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
    const { email, password } = this.loginForm.value;
    //Here we send the login data to the server
    this.authService.login(email, password).subscribe({
    next: () => {
      console.log('Login successful', this.loginForm.value);      
      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido de vuelta!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {        
        this.authService.getProfile().subscribe({
          next:(user)=>{
            console.log('User profile fetched successfully', user);
            this.storage.saveUser(user);
            this.router.navigate(['/home']);
          }
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

  onRegister() {
    this.router.navigate(['/registry']);
  }
}

