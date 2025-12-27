import { Routes } from '@angular/router';
import { BienvenidaGuard } from './core/guards/bienvenida.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./pages/bienvenida/bienvenida.page').then( m => m.BienvenidaPage),
   /// loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
    // canActivate: [BienvenidaGuard]
    loadComponent: () => import('./pages/handler/handler.component').then( m => m.HandlerComponent)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
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
    path: 'invitar/:id',
    loadComponent: () => import('./pages/invite/invite.page').then( m => m.InvitePage)
  },
  {
    path: '**',
    redirectTo: '', // fallback a bienvenida si no se encuentra
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
];
