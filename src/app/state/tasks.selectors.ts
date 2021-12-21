import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from './tasks.reducer';

export const selectTasks = createFeatureSelector<IState>('tasks');

export const selectAllTasks = createSelector(selectTasks, (state) => {
  return state.tasks;
});

export const selectCompletedTasks = createSelector(selectTasks, (state) => {
  return state.tasks.filter((task) => !task.pending);
});

export const selectPendingTasks = createSelector(selectTasks, (state) => {
  return state.tasks.filter((task) => task.pending);
});
