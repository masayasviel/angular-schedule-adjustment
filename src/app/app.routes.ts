import { InternalFeatureKey, InternalReducer } from '@/internal/store/internal.reducer';
import { TemplateComponent } from '@/internal/template/template.component';
import { TopComponent } from '@/top/top.component';
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

export const routes: Routes = [
  {
    path: 'attendance',
    component: TemplateComponent,
    providers: [provideState(InternalFeatureKey, InternalReducer)],
    loadChildren: () => import('./internal/internal.routes').then((m) => m.routes),
  },
  {
    path: '**',
    component: TopComponent,
  },
];
