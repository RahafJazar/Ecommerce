import { Component, computed, effect, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';

import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination'; // <-- import the module
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WishlistService } from '../../core/services/whishlist/wishlist.service';

@Component({
  imports: [CardComponent, NgxPaginationModule],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',

})
export class ShopComponent {

  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly wishlistService = inject(WishlistService);
  pageSize: WritableSignal<number> = signal<number>(0)
  page: WritableSignal<number> = signal<number>(0)
  total: WritableSignal<number> = signal<number>(0)
  categoryId: WritableSignal<string | null> = signal<string>('');

  pagination: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'foo',
    itemsPerPage: this.pageSize(),
    currentPage: this.page(),
    totalItems: this.total()
  });
  constructor() {
    effect(() => {
      if (this.categoryId()) {
        this.getCategoryProducts()
      }
      else {
        this.getAllProductsData();
      }
    })
  }
  ngOnInit(): void {
    this.getCategory();



  }
  getCategory(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.categoryId.set(param.get('categoryId'));
    })
  }
  productsList: WritableSignal<Product[]> = signal<Product[]>([]);
  getAllProductsData(): void {
    this.productsService.getAllProducts(this.pagination().currentPage, this.pagination().itemsPerPage).subscribe({
      next: (resp) => {
        this.productsList.set(resp.data);
        this.productsList().map(prod => {
          if (this.wishlistService.wishlistProductIds().includes(prod._id)) {
            prod.isWish = true;
          }
        })
        this.pagination().totalItems = resp.results;
        this.pagination().itemsPerPage = resp.metadata.limit;
        this.pagination().currentPage = resp.metadata.currentPage;

      }
    })
  }
  getCategoryProducts(): void {
    this.productsService.getProductsDependOnCategory(this.categoryId(), this.pagination().currentPage, this.pagination().itemsPerPage).subscribe({
      next: (resp) => {
        this.productsList.set(resp.data);
        this.productsList().map(prod => {
          if (this.wishlistService.wishlistProductIds().includes(prod._id)) {
            prod.isWish = true;
          }
        })
        this.pagination().totalItems = resp.results;
        this.pagination().itemsPerPage = resp.metadata.limit;
        this.pagination().currentPage = resp.metadata.currentPage;

      }
    })
  }
  pageChanged(page: number): void {
    this.pagination().currentPage = page;
    this.getAllProductsData()
  }

  getBack(): void {

    if (this.router.lastSuccessfulNavigation()?.previousNavigation) {
      this.location.back();
    } else {
      this.router.navigate(['/categories']);
    }
  }


}
