import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { passwordRules } from '../../shared/validators/password.validator';
import { PaswordChecklistComponent } from '../../shared/components/pasword-checklist/pasword-checklist.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [PaswordChecklistComponent, ReactiveFormsModule],
  selector: 'app-forgt-password',
  styleUrl: './forgt-password.component.css',
  templateUrl: './forgt-password.component.html',
})
export class ForgtPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: WritableSignal<number> = signal<number>(1);

  emailControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required, Validators.email]));
  resetCodeControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required]));
  newPasswordControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required, passwordRules]));


  submitEmail(event: SubmitEvent): void {
    //prevent default behaviour
    event.preventDefault();
    if (this.emailControl().valid) {

      //create object from string 
      const data = {
        email: this.emailControl().value
      }
      //call API
      this.authService.forgotPassword(data).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.statusMsg === 'Success') {
            this.step.set(2);
          }

        }
      })
    }
  }

  submitResetCode(event: SubmitEvent): void {
    //prevent default behaviour
    event.preventDefault();
    if (this.resetCodeControl().valid) {
      //create object from string 
      const data = {
        resetCode: this.resetCodeControl().value
      }
      //call API
      this.authService.verifyResetCode(data).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.statusMsg === 'Success') {
            this.step.set(3);
          }
        }
      })
    }
  }

  submitNewPassword(event: SubmitEvent): void {
    //prevent default behaviour
    event.preventDefault();
    if (this.newPasswordControl().valid) {
      //create object from string 
      const data = {
        email: this.newPasswordControl().value,
        newPassword: this.newPasswordControl().value
      }

      //call API
      this.authService.resetPassword(data).subscribe({
        next: (resp) => {
          if (resp.statusMsg === 'Success') {
            //toastr message

            //navigate to login
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 2000);

          }
        }
      })

    }
  }
}
