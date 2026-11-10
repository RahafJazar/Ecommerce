import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)
  categoriesList: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (resp) => {
        if (resp.data) {
          this.categoriesList.set(resp.data);
        }
      }
    })
  }


}
