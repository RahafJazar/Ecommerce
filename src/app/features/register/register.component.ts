import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent { }
