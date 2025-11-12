import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = inject(AuthService).headers();

    // console.log("Authorization:", authToken);

    if (!authToken) {
        // console.warn("no token");
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            'Authorization': `${authToken}`,
            // 'Content-Type': 'application/json',

            // 'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
        },
    });

    return next(authReq);
};

