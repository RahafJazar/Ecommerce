import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { sign } from 'crypto';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {


  private readonly productsService = inject(ProductsService)
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
