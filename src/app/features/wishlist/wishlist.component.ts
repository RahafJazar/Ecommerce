import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { WishlistProduct } from '../../core/models/whishlist.interface';
import { WishlistService } from '../../core/services/whishlist/wishlist.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  imports: [RouterLink],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  private readonly platform = inject(PLATFORM_ID)
  private readonly toastrService = inject(ToastrService)
  private readonly router = inject(Router)
  wishlistList: WritableSignal<WishlistProduct[]> = signal<WishlistProduct[]>([]);
  ngOnInit(): void {
    this.getUserLoggedWishlistList();
  }

  getUserLoggedWishlistList(): void {
    this.wishlistService.getUserLoggedWishlist().subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.wishlistList.set(resp.data);
          this.wishlistService.wishlistProducts.set(resp.data);
        }
      }
    })
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (resp) => {
        if (resp.status === "success") {
          if (isPlatformBrowser(this.platform)) {
            //display toast message 
            this.toastrService.success(resp.message, 'AldoraCart', {
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 2000

            })
          }

          console.log("add cart: \n", resp);
          this.router.navigate(['/cart']);
          //update cart count on navbar
          const count_ = resp.data.products.reduce((total, curr) => total + curr.count, 0)
          this.cartService.cartCount.set(count_)
        }
      }
    })
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishList(productId).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          //update whislist
          this.getUserLoggedWishlistList();
          //update wishlist count 
          this.wishlistService.wishlistProductIds.set(resp.data)
        }
      }
    })
  }
}
