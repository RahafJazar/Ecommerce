import { serverRoutes } from './../../app.routes.server';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { startWith, map } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { confirmPassword } from '../../shared/validators/confirm-password.validator';
import { passwordRules } from '../../shared/validators/password.validator';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginFormInit()
  }
  loginFormInit(): void {

    this.loginForm = this.fb.group
      (
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, passwordRules]],


        }

      );


  }






  /*----- submitForm --------*/
  submitForm(): void {

    if (this.loginForm.valid) {
      this.signIn(this.loginForm.value)
    } else {
      this.loginForm.markAllAsTouched()
    }
  }


  signIn(body: FormGroup): void {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (resp) => {
        if (resp.message === "success") {

          //save token && user data 

          localStorage.setItem('freshToken', resp.token);
          localStorage.setItem('userData', JSON.stringify(resp.user))
          //set isLogged to true
          this.authService.isLogged.set(true)
          //navigate to home page(default)
          this.router.navigate(['/'])
        }

      }
    })
  }


}
