import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/bienvenida/bienvenida.page').then( m => m.BienvenidaPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
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
    path: '**',
    redirectTo: '', // fallback a bienvenida si no se encuentra
  },
  {
    path: 'eventos',
    loadComponent: () => import('./events/eventos/eventos.page').then( m => m.EventosPage)
  },
  {
    path: 'invitads',
    loadComponent: () => import('./events/invitads/invitads.page').then( m => m.InvitadsPage)
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
];
