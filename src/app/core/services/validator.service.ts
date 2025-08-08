import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ValidatorsForm {
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    public passPattern = /(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{5,}/;
    // Una letra minúscula, una letra mayúscula, un número, un carácter especial y mínimo 5 dígitos
    public nombresPattern = "^[A-Z\u00E0-\u00FCÿ\u00f1\u00d1][A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+ *[A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+ *[A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+$";
}
