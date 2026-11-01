import { Component, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';

import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination'; // <-- import the module

@Component({
  imports: [CardComponent, NgxPaginationModule],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',

})
export class ShopComponent {

  private readonly productsService = inject(ProductsService);
  pageSize: WritableSignal<number> = signal<number>(0)
  page: WritableSignal<number> = signal<number>(0)
  total: WritableSignal<number> = signal<number>(0)


  pagination: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'foo',
    itemsPerPage: this.pageSize(),
    currentPage: this.page(),
    totalItems: this.total()
  });
  ngOnInit(): void {
    this.getAllProductsData();
  }

  productsList: WritableSignal<Product[]> = signal<Product[]>([]);
  getAllProductsData(): void {
    this.productsService.getAllProducts(this.pagination().currentPage, this.pagination().itemsPerPage).subscribe({
      next: (resp) => {
        this.productsList.set(resp.data);

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
}
