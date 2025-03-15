import { TemplateComponent } from '@/internal/template/template.component';
import { TopComponent } from '@/top/top.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'attendance',
    component: TemplateComponent,
    loadChildren: () => import('./internal/internal.routes').then((m) => m.routes),
  },
  {
    path: '**',
    component: TopComponent,
  },
];
