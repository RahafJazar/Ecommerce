import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserDataResp } from '../models/user-data.interface';

@Service()
export class AuthService {
    private readonly httpClient = inject(HttpClient);

    signUp(body: FormGroup): Observable<UserDataResp> {
        return this.httpClient.post<UserDataResp>(`${environment.base_url}/api/v1/auth/signup`, body)
    }
    signIn(body: FormGroup): Observable<UserDataResp> {
        return this.httpClient.post<UserDataResp>(`${environment.base_url}/api/v1/auth/signin`, body)
    }
    forgotPassword(body: Object): Observable<any> {
        return this.httpClient.post<any>(`${environment.base_url}/api/v1/auth/forgotPasswords`, body);
    }
    verifyResetCode(body: Object): Observable<any> {
        return this.httpClient.post<any>(`${environment.base_url}/api/v1/auth/verifyResetCode`, body);
    }
    resetPassword(body: Object): Observable<any> {
        return this.httpClient.put<any>(`${environment.base_url}/api/v1/auth/resetPassword`, body);
    }

}
