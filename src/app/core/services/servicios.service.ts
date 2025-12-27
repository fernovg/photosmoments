import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { myProfile } from '../models/general.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private baseUrl = environment.base_url;
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  traerDatos(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, {});
  }

  traerDatosId(endpoint: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`, {});
  }

  traerGuest(endpoint: string, id: string, endpoint1?: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint1}/${id}/${endpoint}`, {});
  }

  guardarDatos(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data);
  }

  actualizarDatos(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data);
  }

  eliminarDatos(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}`);
  }

  redireccionar(ruta: string) {
    this.router.navigate([ruta]);
  }

  redireccionarConToken(ruta: string) {
    this.router.navigate([ruta], {
      queryParams: {
        token: localStorage.getItem('token')
      }
    });
  }

  redireccionarConTokenPost(ruta: string, data: any) {
    this.router.navigate([ruta], {
      queryParams: {
        token: localStorage.getItem('token')
      },
      queryParamsHandling: 'merge'
    });
  }


}
