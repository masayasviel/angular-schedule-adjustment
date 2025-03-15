import { MemberAttendanceRecord } from '@/api/attendance.service';
import { InternalFacade } from '@/internal/store/internal.facade';
import { Component, computed, effect, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-attendance-sheet',
  imports: [MatTableModule],
  templateUrl: './attendance-sheet.component.html',
  styleUrl: './attendance-sheet.component.scss',
})
export class AttendanceSheetComponent {
  private readonly internalFacade = inject(InternalFacade);

  record = this.internalFacade.signalRecord;
  displayColumns = computed(() => ['name', ...(this.record()?.candidateDate ?? [])]);

  dataSource = new MatTableDataSource<MemberAttendanceRecord>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.record()?.records ?? [];
    });
  }
}
