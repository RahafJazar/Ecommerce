import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { sign } from 'crypto';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart/cart.service';
import { concat } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {


  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.getAllProductsData();
  }

  productsList: WritableSignal<Product[]> = signal<Product[]>([]);
  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (resp) => {
        this.productsList.set(resp.data)
      }
    })
  }


  addProductItemToYourCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (resp) => {
        if (resp.status === "success") {
          //display toast message 
          this.toastrService.success(resp.message, 'AldoraCart', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000

          })
          console.log("add cart: \n", resp);
          this.router.navigate(['/cart'])
        }

      }
    })
  }
}
