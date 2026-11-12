import { Component, computed, inject, input, InputSignal, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/whishlist/wishlist.service';
import { WishlistProduct } from '../../../core/models/whishlist.interface';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-card',
  styleUrl: './card.component.css',
  templateUrl: './card.component.html',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  product: InputSignal<Product> = input.required();



  addProductItemToYourCart(productId: string): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
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
      else {
        if (isPlatformBrowser(this.platform)) {
          if (isPlatformBrowser(this.platform)) {
            //show warning toastr to login 
            this.toastrService.warning('Please Login to continue', 'AldoraCart', {
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 2000

            })
          }

        }

      }
    }

  }

  addProductToWishList(productId: string): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        const bodyRequest = {
          "productId": productId
        }
        this.wishlistService.addProductToWishList(bodyRequest).subscribe({
          next: (resp) => {
            if (resp.status === "success") {

              //display toast message 
              this.toastrService.success(resp.message, 'AldoraCart', {
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
                timeOut: 2000

              })
              console.log("add cart to wishlist: \n", resp);
              this.router.navigate(['/wishlist']);
              //update whishlist number on navbar 
              this.wishlistService.wishlistProductIds.set(resp.data)

            }
          }
        })
      }
      else {
        if (isPlatformBrowser(this.platform)) {
          //show warning toastr to login 
          this.toastrService.warning('Please Login to continue', 'AldoraCart', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000

          })
        }

      }
    }
  }
}
