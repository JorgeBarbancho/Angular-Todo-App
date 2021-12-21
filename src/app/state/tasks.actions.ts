import { createAction, props } from '@ngrx/store';

export const addTask = createAction('[Todo List] Add Task', props<{ taskText: string }>());
export const clearAllTasks = createAction('[Todo List Clear All Tasks]');
export const removeTask = createAction('[Todo List Remove Task]', props<{ taskId: number }>());
export const toggleTask = createAction('[Todo List Toggle Task]', props<{ taskId: number }>());
