import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CartDataResponse } from '../../models/cart-data.interface';

@Service()
export class CartService {
    private readonly httpClient = inject(HttpClient);

    addProductToCart(productId: string): Observable<CartDataResponse> {
        return this.httpClient.post<CartDataResponse>(`${environment.base_url}/api/v2/cart`, {
            "productId": productId
        })
    }

    getUserLoggedCart(): Observable<CartDataResponse> {
        return this.httpClient.get<CartDataResponse>(`${environment.base_url}/api/v2/cart`)
    }

    removeProductFromCart(productId: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.base_url}/api/v2/cart/${productId}`)
    }

    updateProductQuantity(productCount: number, productId: string): Observable<any> {
        return this.httpClient.put<any>(`${environment.base_url}/api/v2/cart/${productId}`, {
            "count": productCount
        })
    }

    clearUserCart(): Observable<any> {
        return this.httpClient.delete<any>(`${environment.base_url}/api/v2/cart`)
    }

}
