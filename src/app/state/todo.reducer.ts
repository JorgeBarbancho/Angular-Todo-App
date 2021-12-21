import { createReducer, on } from '@ngrx/store';
import { addTask, clearAllTasks, removeTask, toggleTask } from './todo.actions';
import { Task } from '../todo/task';

export const initialState: Task[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(clearAllTasks, () => []),
  on(removeTask, (state, { task }) => state.filter((t) => t.id !== task.id)),
  on(toggleTask, (state, { task }) =>
    state.map((todo) => {
      if (todo.id !== task.id) {
        return todo;
      }
      return {
        ...todo,
        pending: !todo.pending,
      };
    })
  )
);
