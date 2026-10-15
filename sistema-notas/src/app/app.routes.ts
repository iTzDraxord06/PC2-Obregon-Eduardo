import { Routes } from '@angular/router';
import { Lista } from './lista/lista';
import { Detalle } from './detalle/detalle';

export const routes: Routes = [
  { path: '', component: Lista },
  { path: 'detalle/:id', component: Detalle },
  { path: '**', redirectTo: '' }
];