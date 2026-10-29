import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class PaymentService {
    private readonly httpClient = inject(HttpClient);

    createCacheOrdar(cartId: string, body: Object): Observable<any> {
        return this.httpClient.post<any>(`${environment.base_url}/api/v1/orders/${cartId}`, body)
    }
    checkoutSession(cartId: string, body: object): Observable<any> {
        return this.httpClient.post<any>(`${environment.base_url}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlOfServer}`, {})
    }

}
