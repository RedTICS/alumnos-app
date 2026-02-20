import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from './config';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = CONFIG.API_URL; // tu backend Node

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, { username, password });
    }

    getAlumnos(): Observable<any> {
        return this.http.get(`${this.baseUrl}/alumnos`);
    }

    getAlumno(dni: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/alumnos/${dni}`);
    }

    agregarAlumno(alumno: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/alumnos`, alumno);
    }

    editarAlumno(dni: Number, alumno: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/alumnos/${dni}`, alumno);
    }
}
