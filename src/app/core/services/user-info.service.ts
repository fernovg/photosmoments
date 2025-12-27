import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiciosService } from './servicios.service'; // tu servicio de API

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    private userData$ = new BehaviorSubject<any>(null);
    private isLoading$ = new BehaviorSubject<boolean>(false);

    private servicios = inject(ServiciosService);

    constructor() { }

    cargarInfo() {
        this.isLoading$.next(true);
        this.servicios.traerDatos('profile').subscribe({
            next: (resp) => {
                this.userData$.next(resp);
                this.isLoading$.next(false);
            },
            error: () => {
                this.isLoading$.next(false);
            }
        });
    }

    getUserData(): Observable<any> {
        return this.userData$.asObservable();
    }

    getLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    getUserDataValue(): any {
        return this.userData$.value;
    }
}
