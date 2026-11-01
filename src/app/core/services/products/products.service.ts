import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, PaginatedResponse } from '../../models/shared/paginated-response.interface';
import { Product } from '../../models/product.interface';
@Service()
export class ProductsService {
    private readonly httpClient = inject(HttpClient);

    getAllProducts(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Product>> {
        return this.httpClient.get<PaginatedResponse<Product>>(`${environment.base_url}/api/v1/products?page=${page}&limit=${limit}`)
    }

    getSpercificProduct(productId: string | null): Observable<ApiResponse<Product>> {
        return this.httpClient.get<ApiResponse<Product>>(`${environment.base_url}/api/v1/products/${productId}`)
    }

}
