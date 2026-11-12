import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Category } from '../../core/models/cart-data.interface';

@Component({
  imports: [],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandsList: WritableSignal<Category[]> = signal<Category[]>([]);
  ngOnInit(): void {
    this.getAllBrandsList()
  }



  getAllBrandsList(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (resp) => {
        if (resp.data) {
          this.brandsList.set(resp.data);
        }
      }
    })

  }
}
