import { Component, inject, Inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { sign } from 'crypto';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart/cart.service';
import { concat } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { platform } from 'process';

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
  private readonly platform = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
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
      else {
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
