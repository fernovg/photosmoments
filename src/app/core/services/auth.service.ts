import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private baseUrl = environment.base_url;
    private http = inject(HttpClient);
    private router = inject(Router);

    login(email: string, password: string): Observable<AuthResponse> {
        const body = {
            email: email,
            password: password
        };
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body).pipe(
            tap(data => {
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_type', data.token_type);
                    // this.router.navigate(['tabs/inicio']);
                }
            })
        );
    }

    // logout(): Observable<AuthResponse> {
    //     return this.http.post<AuthResponse>(`${this.baseUrl}/auth/logout`, {});
    // }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }

    headers() {
        const token = localStorage.getItem('access_token');
        const tokenType = localStorage.getItem('token_type');
        const tokenDb = tokenType+' '+ token;
        return tokenDb
    }
}
