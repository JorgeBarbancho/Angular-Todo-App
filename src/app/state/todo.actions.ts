import { createAction, props } from '@ngrx/store';
import { Task } from '../todo/task';

export const addTask = createAction('[Todo List] Add Task', props<{ task: Task }>());
export const clearAllTasks = createAction('[Todo List Clear All Tasks]');
export const removeTask = createAction('[Todo List Remove Task]', props<{ task: Task }>());
export const toggleTask = createAction('[Todo List Toggle Task]', props<{ task: Task }>());
