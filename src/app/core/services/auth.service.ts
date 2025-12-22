import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
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
                if (data.access_token && data?.token_type) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_type', data.token_type);
                } else {
                    this.clearToken();
                }
            })
        );
    }

    register(name: string, lastname: string, email: string, password: string, password_confirmation: string): Observable<AuthResponse> {
        const body = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        };
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, body).pipe(
            switchMap(() => {
                // hacer login después de registrarse
                return this.login(email, password);
            })
        );
    }

    logout() {
        this.clearToken();
        this.router.navigate(['signin'], { replaceUrl: true });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');

        if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
            this.clearToken();
            return false;
        }
        return true;
    }

    headers() {
        const token = localStorage.getItem('access_token');
        const type = localStorage.getItem('token_type');

        if (!token || !type || token === 'null' || token === 'undefined' || type === 'undefined') {
            return null;
        }

        return `${type} ${token}`;
    }

    private clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
    }
}
