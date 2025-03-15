import { AttendanceService } from '@/api/attendance.service';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, concatMap, map } from 'rxjs';
import * as AttendanceActions from './internal.action';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private readonly snackBar = inject(MatSnackBar);
  private attendanceService = inject(AttendanceService);

  getAttendance$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttendanceActions.loadRecords),
      concatMap(({ uuid }) =>
        this.attendanceService
          .getAttendance(uuid)
          .pipe(
            map((response) =>
              response ? AttendanceActions.loadRecordsSuccess({ response }) : AttendanceActions.failed(),
            ),
          ),
      ),
    );
  });

  registerAttendance$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttendanceActions.registerAttendance),
        concatMap(({ title, candidateDate }) => this.attendanceService.registerAttendance(title, candidateDate)),
      ),
    {
      dispatch: false,
    },
  );

  deleteAttendance$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttendanceActions.deleteAttendance),
        concatMap(({ uuid }) => this.attendanceService.deleteAttendance(uuid)),
      ),
    {
      dispatch: false,
    },
  );

  registerUserAttendance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.registerUserAttendance),
      concatMap(({ uuid, newAttendance }) =>
        this.attendanceService
          .registerUserAttendance(uuid, newAttendance)
          .pipe(map((success) => (success ? AttendanceActions.success() : AttendanceActions.failed()))),
      ),
    ),
  );

  updateUserAttendance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.updateUserAttendance),
      concatMap(({ uuid, name, status }) =>
        this.attendanceService
          .updateUserAttendance(uuid, name, status)
          .pipe(map((success) => (success ? AttendanceActions.success() : AttendanceActions.failed()))),
      ),
    ),
  );

  deleteUserAttendance$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttendanceActions.deleteUserAttendance),
        concatMap(({ uuid, name }) => this.attendanceService.deleteUserAttendance(uuid, name)),
      ),
    {
      dispatch: false,
    },
  );

  failed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttendanceActions.failed),
        concatMap(() => {
          this.snackBar.open('失敗しました', '閉じる', {
            duration: 1000,
          });
          return EMPTY;
        }),
      ),
    {
      dispatch: false,
    },
  );
}
