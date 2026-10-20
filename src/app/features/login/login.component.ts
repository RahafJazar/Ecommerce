import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  private readonly x = inject(FormBuilder)

}
