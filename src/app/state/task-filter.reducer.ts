import { createReducer, on } from '@ngrx/store';
import { changeFilter } from './task-filter.actions';

export enum Filter {
  None,
  Completed,
  Pending,
}

export const initialState: number = Filter.None;

export const tasksFilterReducer = createReducer(
  initialState,
  on(changeFilter, (state, { buttonIdx }) => buttonIdx)
);
