import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, OnInit, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/models/category.interface';
import { WishlistService } from '../../../core/services/whishlist/wishlist.service';

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
  private readonly wishlistService = inject(WishlistService);
  private readonly categoriesService = inject(CategoriesService)
  cart_count: Signal<number> = computed(() => this.cartService.cartCount());
  whishlist_count: Signal<number> = computed(() => this.wishlistService.wishlistProductIds().length)
  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  //inject PLATFORM_ID
  private platform = inject(PLATFORM_ID)
  //always listen 
  isLogged: Signal<boolean> = computed(() => this.authService.isLogged());
  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platform) && this.isLogged()) {
        this.getCartCount();
        this.getWhishlistCount();

      } else {
        this.cartService.cartCount.set(0)
        this.wishlistService.wishlistProductIds.set([]);
      }
    })
  }

  ngOnInit(): void {
    this.checkUserToken()
    this.flowbiteInit()
    this.getCategories()

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
        this.getWhishlistCount();
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
  getWhishlistCount(): void {

    this.wishlistService.getUserLoggedWishlist().subscribe({
      next: (resp) => {
        const wishlistIds: string[] = resp.data.map(wish => wish._id);
        this.wishlistService.wishlistProductIds.set(wishlistIds);
      }
    })
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (resp) => {
        if (resp.data) {
          this.categories.set(resp.data);
        }
      }
    })
  }
}
