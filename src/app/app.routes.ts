import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./pages/bienvenida/bienvenida.page').then( m => m.BienvenidaPage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
