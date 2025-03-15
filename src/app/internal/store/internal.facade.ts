import { MemberAttendanceRecord } from '@/api/attendance.service';
import * as InternalAction from '@/internal/store/internal.action';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as InternalSelector from './internal.selector';

@Injectable({
  providedIn: 'root',
})
export class InternalFacade {
  private store = inject(Store);

  signalRecord = this.store.selectSignal(InternalSelector.selectRecord);

  loadRecords(uuid: string): void {
    this.store.dispatch(InternalAction.loadRecords({ uuid }));
  }

  registerAttendance(title: string, candidateDate: string[]): void {
    this.store.dispatch(InternalAction.registerAttendance({ title, candidateDate }));
  }

  deleteAttendance(uuid: string): void {
    this.store.dispatch(InternalAction.deleteAttendance({ uuid }));
  }

  registerUserAttendance(uuid: string, newAttendance: MemberAttendanceRecord): void {
    this.store.dispatch(InternalAction.registerUserAttendance({ uuid, newAttendance }));
  }

  updateUserAttendance(uuid: string, name: string, status: MemberAttendanceRecord['status']): void {
    this.store.dispatch(InternalAction.updateUserAttendance({ uuid, name, status }));
  }

  deleteUserAttendance(uuid: string, name: string): void {
    this.store.dispatch(InternalAction.deleteUserAttendance({ uuid, name }));
  }

  reset(): void {
    this.store.dispatch(InternalAction.reset());
  }
}
