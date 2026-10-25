import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, OnChanges, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map, startWith } from 'rxjs';
import { passwordRules } from '../../shared/validators/password.validator';
import { confirmPassword } from '../../shared/validators/confirm-password.validator';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerFormInit();
    this.passCheckDef();
  }
  registerFormInit(): void {

    this.registerForm = this.fb.group
      (
        {
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, passwordRules]],
          //at least one uppercase letter, one lowercase letter, one number, one special character, and a minimum length of 8 characters
          rePassword: ['', [Validators.required]],
          phone: ['', [Validators.required, Validators.pattern(/^(\+20|01|00201)[0-2,5]{1}[0-9]{8}$/)]],

        }
        ,
        {
          validators: [confirmPassword]
        }
      );


  }

  // ========================================
  // 3. Password Strength Checks
  // ========================================

  readonly passCheck = signal([
    { label: '8 أحرف على الأقل', valid: false },
    { label: 'حرف كبير (A–Z)', valid: false },
    { label: 'حرف صغير (a–z)', valid: false },
    { label: 'رقم واحد على الأقل', valid: false },
    { label: 'رمز خاص من @ # $ % ^ & * !', valid: false }
  ]);

  readonly completedChecks = computed(
    () => this.passCheck().filter(check => check.valid).length
  );


  /*--------Validate Password Strength -------*/
  passCheckDef(): void {
    const passwordControl = this.registerForm.controls['password'];

    passwordControl.valueChanges
      .pipe(
        startWith(passwordControl.value),
        map(() => {
          const errors = passwordControl.errors?.['passwordRules'];


          return [
            {
              label: '8 أحرف على الأقل',
              valid: passwordControl.value?.length >= 8
            },
            {
              label: 'حرف كبير (A–Z)',
              valid: /[A-Z]/.test(passwordControl.value ?? '')
            },
            {
              label: 'حرف صغير (a–z)',
              valid: /[a-z]/.test(passwordControl.value ?? '')
            },
            {
              label: 'رقم واحد على الأقل',
              valid: /[0-9]/.test(passwordControl.value ?? '')
            },
            {
              label: 'رمز خاص من @ # $ % ^ & * !',
              valid: /[@#$%^&*!]/.test(passwordControl.value ?? '')
            }
          ];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(checks => {
        this.passCheck.set(checks);
      });
  }




  /*----- submitForm --------*/
  submitForm(): void {
    if (this.registerForm.valid) {
      this.signUp(this.registerForm.value)
    } else {
      this.registerForm.markAllAsTouched()
    }
  }


  signUp(body: FormGroup): void {
    this.authService.signUp(this.registerForm.value).subscribe({
      next: (resp) => {
        if (resp.message === "success") {
          console.log(resp);
          this.router.navigate(['/login'])
        }

      }
    })
  }


}
