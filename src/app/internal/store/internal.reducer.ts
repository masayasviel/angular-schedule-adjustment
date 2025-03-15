import { GetAttendanceTableResponse } from '@/api/attendance.service';
import { Action, createReducer, on } from '@ngrx/store';
import * as AttendanceActions from './internal.action';

export interface State {
  record: GetAttendanceTableResponse | null;
}

export const initialState: State = {
  record: null,
};

const reducer = createReducer(
  initialState,
  on(
    AttendanceActions.loadRecordsSuccess,
    (state, { response }): State => ({
      ...state,
      record: response,
    }),
  ),
  on(AttendanceActions.reset, (_state) => initialState),
);

export const InternalReducer = (state: State | undefined, action: Action): State => reducer(state, action);

export const InternalFeatureKey = 'internal';
