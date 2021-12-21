import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from './tasks.reducer';
import { Task } from '../todo/task';
import { Filter } from './task-filter.reducer';

export const selectTasks = createFeatureSelector<IState>('tasks');

export const selectFilter = createFeatureSelector<number>('filter');

export const selectPendingTasks = createSelector(selectTasks, (state) => {
  return state.tasks.filter((task) => task.pending);
});

export const filterTasks = createSelector(selectTasks, selectFilter, (state, filter) => {
  let tasksToReturn: Task[] = [];
  switch (filter) {
    case Filter.None:
      tasksToReturn = state.tasks;
      break;
    case Filter.Completed:
      tasksToReturn = state.tasks.filter((task) => !task.pending);
      break;
    case Filter.Pending:
      tasksToReturn = state.tasks.filter((task) => task.pending);
      break;
  }
  return tasksToReturn;
});
