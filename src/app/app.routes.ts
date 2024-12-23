import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ruta dinámica
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component'),
  },

  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'about';
    },
  },
];
