import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-forgt-password',
  styleUrl: './forgt-password.component.css',
  templateUrl: './forgt-password.component.html',
})
export class ForgtPasswordComponent {
  step: WritableSignal<number> = signal<number>(1);

  emailControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required, Validators.email]));
  resetCodeControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required]));
  newPassword: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required],));

}
