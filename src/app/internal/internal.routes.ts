import type { Routes } from '@angular/router';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';

export const routes: Routes = [{ path: ':uuid', component: AttendanceSheetComponent }];
