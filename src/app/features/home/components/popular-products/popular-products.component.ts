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
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  imports: [CurrencyPipe, RouterLink, CardComponent],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {


  private readonly productsService = inject(ProductsService);

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



}
