import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../../models/cart-data.interface';
import { PaginatedResponse } from '../../models/shared/paginated-response.interface';

@Service()
export class BrandsService {

    private readonly httpClient = inject(HttpClient);


    getAllBrands(): Observable<PaginatedResponse<Category>> {
        return this.httpClient.get<PaginatedResponse<Category>>(`${environment.base_url}/api/v1/brands`)
    }
    getSpecificBrand(brandId: string | null): Observable<Category> {
        return this.httpClient.get<Category>(`${environment.base_url}/api/v1/brands/${brandId}`)
    }

}
