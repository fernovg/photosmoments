import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        // loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
        loadComponent: () => import('../events/evento/evento.page').then(m => m.EventoPage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('../pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: 'eventos',
        loadComponent: () => import('../events/eventos/eventos.page').then(m => m.EventosPage)
      },
      {
        path: 'evento',
        loadComponent: () => import('../events/evento/evento.page').then( m => m.EventoPage)
      },
      {
        path: 'invitads',
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
