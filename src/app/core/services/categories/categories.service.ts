import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../models/shared/paginated-response.interface';
import { Category } from '../../models/category.interface';

@Service()
export class CategoriesService {

    private readonly httpClient = inject(HttpClient);

    getAllCategories(): Observable<PaginatedResponse<Category>> {
        return this.httpClient.get<PaginatedResponse<Category>>(`${environment.base_url}/api/v1/categories`)
    }
    getSpecificCategory(categorydId: string | null): Observable<Category> {
        return this.httpClient.get<Category>(`${environment.base_url}/api/v1/categories/${categorydId}`)
    }


}
