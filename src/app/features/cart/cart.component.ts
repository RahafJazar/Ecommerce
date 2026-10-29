import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartData, CartDataResponse } from '../../core/models/cart-data.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly platform = inject(PLATFORM_ID);

  cartDetailsData: WritableSignal<CartData> = signal<CartData>({} as CartData)


  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken')
      if (token) {
        this.cartService.getUserLoggedCart().subscribe({
          next: (resp) => {
            if (resp.status === "success") {
              this.cartDetailsData.set(resp.data)
            }
          }
        })
      }

    }
    "".split('').reverse().splice(0, 6)
  }
  RemoveProductItemFromCart(productId: string): void {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (resp) => {

        if (resp.status === "success") {
          //toastr 
          this.toastrService.success(`Product ${productId} removed successfully `, 'AldoraCart', {
            closeButton: true,
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing'
          })
          //update all products
          this.cartDetailsData.set(resp.data)
        }

      }
    })
  }
  clearAllCartItems(): void {
    this.cartService.clearUserCart().subscribe({
      next: (resp) => {
        if (resp.status === "success") {
          this.cartDetailsData.set(resp.data)
        }
      }
    })
  }
  updateProductItemsQuantity(count: number, productId: string): void {

    this.cartService.updateProductQuantity(count, productId).subscribe({
      next: (resp) => {
        if (resp.status === "success") {
          this.cartDetailsData.set(resp.data)
        }

      }
    })
  }
}
