import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistProduct } from '../../core/models/whishlist.interface';
import { WishlistService } from '../../core/services/whishlist/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  wishlistList: WritableSignal<WishlistProduct[]> = signal<WishlistProduct[]>([]);
  ngOnInit(): void {

  }

  getUserLoggedWishlistList(): void {
    this.wishlistService.getUserLoggedWishlist().subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.wishlistList.set(resp.data)
        }
      }
    })
  }

  addToCart(productId: string): void {

  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishList(productId).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          //update whislist
          this.getUserLoggedWishlistList();
          this.wishlistService.whishlistCount.set(resp.data.length)
        }
      }
    })
  }
}
