import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CONFIG } from './config';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private api = CONFIG.API_URL;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log(username, password);
        return this.http.post<any>(`${this.api}/login`, { username, password })
            .pipe(
                tap(res => localStorage.setItem('token', res.token))
            );
    }

    logout() {
        localStorage.removeItem('token');
    }

    isLogged(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    // Decodificar JWT
    getPayload(): any | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Token inválido', e);
            return null;
        }
    }
}
