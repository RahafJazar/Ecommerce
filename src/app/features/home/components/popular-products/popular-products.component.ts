import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { WishlistService } from '../../../../core/services/whishlist/wishlist.service';

@Component({
  imports: [CurrencyPipe, RouterLink, CardComponent],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {


  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService)

  ngOnInit(): void {
    this.getAllProductsData();
  }

  productsList: WritableSignal<Product[]> = signal<Product[]>([]);
  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (resp) => {
        this.productsList.set(resp.data)
        this.productsList().map((prod) => {
          if (this.wishlistService.wishlistProductIds().includes(prod._id)) {
            prod.isWish = true

          }
        })
      }
    })
  }



}
