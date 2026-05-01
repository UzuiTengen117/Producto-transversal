import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Menu } from './components/menu/menu';
import { ArquitecturaYServicios } from './components/arquitectura-y-servicios/arquitectura-y-servicios';
import { LenguajeMarcas } from './components/lenguaje-marcas/lenguaje-marcas';
import { CSS3 } from './components/css3/css3';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu },
  { path: 'arquitecturayservicios', component: ArquitecturaYServicios },
  { path: 'lenguajedemarcas', component: LenguajeMarcas },
  { path: 'css3', component: CSS3 },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
