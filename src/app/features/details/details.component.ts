import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe, Location } from '@angular/common';


@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-details',
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  productId: WritableSignal<string | null> = signal<string | null>('');
  productData: WritableSignal<Product | null> = signal<Product | null>(null);
  ngOnInit(): void {
    this.getProductId();
    this.getSpecificProductData(this.productId())
  }
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.productId.set(param.get('id'));
    })
  }

  getSpecificProductData(productId: string | null): void {
    this.productsService.getSpercificProduct(productId).subscribe({
      next: (resp) => {
        this.productData.set(resp.data);

      }
    })
  }
  getBack(): void {

    if (this.router.lastSuccessfulNavigation()?.previousNavigation) {
      this.location.back();
    } else {
      this.router.navigate(['/shop']);
    }
  }

}
