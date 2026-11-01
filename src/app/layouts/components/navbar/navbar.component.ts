import { Component, computed, inject, OnChanges, OnInit, PLATFORM_ID, Signal, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { fail } from 'assert';
import { CartService } from '../../../core/services/cart/cart.service';

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
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  cart_count: Signal<number> = computed(() => this.cartService.cartCount());


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
        this.getCartCount();
      }
      else {
        this.authService.isLogged.set(false)
        this.router.navigate(['/'])
      }
    }
  }

  logOut(): void {
    this.authService.signOut();
  }
  getCartCount(): void {

    this.cartService.getUserLoggedCart().subscribe({
      next: (resp) => {
        const count_ = resp.data.products.reduce((prev, curr) => prev + curr.count, 0)
        this.cartService.cartCount.set(count_);
      }
    })
  }
}
