import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, password } = this.registerForm.value;

    this.authService.register({
      username: username!,
      password: password!
    }).subscribe({
      next: () => {
        this.authService.login({
          username: username!,
          password: password!
        }).subscribe({
          next: () => {
            this.router.navigate(['/books']);
          },
          error: (err) => {
            console.error('Automatic login failed', err);
          }
        });
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}