import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
  errorMessage: string = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]], 
    });
  }

 
  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      
      if (username === 'admin' && password === 'password123') {
        const mockToken = 'ce6dcd2d9ab71bed5ce42c9ba649956a29433676b1ff539b30a760fe37da1182';
        localStorage.setItem('auth_token', mockToken); 
        console.log('auth_token', localStorage.getItem('auth_token'));
        
        this.router.navigate(['/user-list']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
