import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const STATUS = ['ok', 'pending', 'ng'] as const;
export type StatusTypeLiteral = (typeof STATUS)[number];

export interface MemberAttendanceRecord {
  name: string;
  status: StatusTypeLiteral[];
}

export interface GetAttendanceTableResponse {
  uuid: string;
  title: string;
  candidateDate: string[];
  records: MemberAttendanceRecord[];
}

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private database: GetAttendanceTableResponse[] = [];

  getAttendance(uuid: string): Observable<GetAttendanceTableResponse | null> {
    const target = this.database.find((item) => item.uuid === uuid);
    return of(target ?? null);
  }

  registerAttendance(title: string, candidateDate: string[]): void {
    this.database.push({
      uuid: crypto.randomUUID(),
      title,
      candidateDate: [...candidateDate],
      records: [],
    });
  }

  deleteAttendance(uuid: string): Observable<void> {
    this.database = this.database.filter((item) => item.uuid !== uuid);
    return of();
  }

  registerUserAttendance(uuid: string, newAttendance: MemberAttendanceRecord): Observable<boolean> {
    const target = this.database.find((item) => item.uuid === uuid);
    if (target === undefined) {
      return of(false);
    }
    target.records.push(newAttendance);
    return of(true);
  }

  updateUserAttendance(uuid: string, name: string, status: StatusTypeLiteral[]): Observable<boolean> {
    const targetAttendance = this.database.find((item) => item.uuid === uuid);
    if (targetAttendance === undefined) {
      return of(false);
    }
    const targetUser = targetAttendance.records.find((item) => item.name === name);
    if (targetUser === undefined) {
      return of(false);
    }
    targetUser.status = [...status];
    return of(true);
  }

  deleteUser(uuid: string, name: string): Observable<void> {
    const targetAttendance = this.database.find((item) => item.uuid === uuid);
    if (targetAttendance === undefined) {
      return of();
    }
    targetAttendance.records = targetAttendance.records.filter((item) => item.name !== name);
    return of();
  }
}
