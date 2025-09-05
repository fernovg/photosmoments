// src/app/guards/bienvenida.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BIENVENIDA_VERSION } from 'src/app/constants/app-version';


@Injectable({
  providedIn: 'root'
})
export class BienvenidaGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const bienvenidaGuardada = localStorage.getItem('bienvenidaVersion');

    // Si la versión coincide, no mostramos bienvenida
    if (bienvenidaGuardada === BIENVENIDA_VERSION) {
      this.router.navigate(['/home']); // Ruta principal
      return false;
    }

    // Si es la primera vez o versión distinta, sí mostramos
    return true;
  }
}
