import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        canActivate: [AuthGuard],
        // loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
        loadComponent: () => import('../events/evento/evento.page').then(m => m.EventoPage)
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard],
        loadComponent: () => import('../pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: 'eventos',
        canActivate: [AuthGuard],
        loadComponent: () => import('../events/eventos/eventos.page').then(m => m.EventosPage)
      },
      {
        path: 'evento',
        canActivate: [AuthGuard],
        loadComponent: () => import('../events/evento/evento.page').then( m => m.EventoPage)
      },
      {
        path: 'invitads',
        canActivate: [AuthGuard],
        loadComponent: () => import('../events/invitads/invitads.page').then(m => m.InvitadsPage)
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  }
];
