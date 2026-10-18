import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent { }
