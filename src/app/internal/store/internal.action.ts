import { GetAttendanceTableResponse, MemberAttendanceRecord } from '@/api/attendance.service';
import { createAction, props } from '@ngrx/store';

export const loadRecords = createAction('[Attendance Sheet] Load Records', props<{ uuid: string }>());
export const loadRecordsSuccess = createAction(
  '[Attendance Sheet] Load Records Success',
  props<{ response: GetAttendanceTableResponse }>(),
);
export const registerAttendance = createAction(
  '[Attendance Sheet] Register Attendance',
  props<{ title: string; candidateDate: string[] }>(),
);
export const deleteAttendance = createAction('[Attendance Sheet] Delete Attendance', props<{ uuid: string }>());
export const registerUserAttendance = createAction(
  '[Attendance Sheet] Register User Attendance',
  props<{ uuid: string; newAttendance: MemberAttendanceRecord }>(),
);
export const updateUserAttendance = createAction(
  '[Attendance Sheet] Update User Attendance',
  props<{ uuid: string; name: string; status: MemberAttendanceRecord['status'] }>(),
);
export const deleteUserAttendance = createAction(
  '[Attendance Sheet] Delete User Attendance',
  props<{ uuid: string; name: string }>(),
);
export const reset = createAction('[Attendance Sheet] Reset');
export const success = createAction('[Attendance Sheet] Success');
export const failed = createAction('[Attendance Sheet] Failed');
