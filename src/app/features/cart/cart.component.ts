import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartData, CartDataResponse } from '../../core/models/cart-data.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetailsData: WritableSignal<CartData> = signal<CartData>({} as CartData)


  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getUserLoggedCart().subscribe({
      next: (resp) => {
        if (resp.status === "success") {
          this.cartDetailsData.set(resp.data)
        }
      }
    })
  }

}
