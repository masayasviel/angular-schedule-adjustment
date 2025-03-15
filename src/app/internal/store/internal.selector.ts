import { InternalFeatureKey, State } from '@/internal/store/internal.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectInternalList = createFeatureSelector<State>(InternalFeatureKey);

export const selectRecord = createSelector(selectInternalList, (state) => state.record);
