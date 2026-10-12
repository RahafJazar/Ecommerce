import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-popular-categories',
  styleUrl: './popular-categories.component.css',
  templateUrl: './popular-categories.component.html',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  ngOnInit(): void {
    this.getAllCategories();
  }

  categoriesList: WritableSignal<Category[]> = signal<Category[]>([]);
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (resp) => {
        console.log('categories :\n ', resp);
        this.categoriesList.set(resp.data)
      }
    })
  }
}
