import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm: FormGroup = this.fb.group
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



  /*--------Validate Password Strength -------*/
  readonly passCheck = toSignal(
    this.registerForm.controls['password'].valueChanges.pipe(
      startWith(this.registerForm.controls['password'].value),
      map(value => {
        const errors =
          this.registerForm.controls['password'].getError('passwordRules');

        const hasValue = value.length > 0;

        return [
          {
            label: '8 أحرف على الأقل',
            valid: hasValue && !errors?.minLength,
          },
          {
            label: 'حرف كبير (A–Z)',
            valid: hasValue && !errors?.uppercase,
          },
          {
            label: 'حرف صغير (a–z)',
            valid: hasValue && !errors?.lowercase,
          },
          {
            label: 'رقم واحد على الأقل',
            valid: hasValue && !errors?.number,
          },
          {
            label: 'رمز خاص من @ # $ % ^ & * !',
            valid: hasValue && !errors?.special,
          },
        ];
      })
    ),
    { requireSync: true }
  );
  readonly completedChecks = computed(
    () => this.passCheck().filter(check => check.valid).length
  );



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
