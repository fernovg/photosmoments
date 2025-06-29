import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('../pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  }
];
