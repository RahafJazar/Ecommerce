import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private readonly flowbite = inject(FlowbiteService);
  //copy of isLogged state
  private readonly authService = inject(AuthService);

  //inject PLATFORM_ID
  private platform = inject(PLATFORM_ID)
  //always listen 
  isLogged: Signal<boolean> = computed(() => this.authService.isLogged());
  ngOnInit(): void {
    this.checkUserToken()
    this.flowbiteInit()
  }

  flowbiteInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite()
    })
  }

  checkUserToken() {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.authService.isLogged.set(true)
      }
    }
  }

  logOut(): void {
    this.authService.signOut();
  }
}
