import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GetWishlistResponse, WishlistActionResponse } from '../../models/whishlist.interface';
@Service()
export class WishlistService {
    private readonly httpClient = inject(HttpClient);
    whishlistCount: WritableSignal<number> = signal<number>(0)
    addProductToWishList(body: Object): Observable<WishlistActionResponse> {
        return this.httpClient.post<WishlistActionResponse>(`${environment.base_url}/api/v1/wishlist`, body)
    }

    removeProductFromWishList(productId: string): Observable<WishlistActionResponse> {
        return this.httpClient.delete<WishlistActionResponse>(`${environment.base_url}/api/v1/wishlist/${productId}`)
    }
    getUserLoggedWishlist(): Observable<GetWishlistResponse> {
        return this.httpClient.get<GetWishlistResponse>(`${environment.base_url}/api/v1/wishlist`)
    }
}
