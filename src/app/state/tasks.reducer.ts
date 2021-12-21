import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { addTask, clearAllTasks, removeTask, toggleTask } from './tasks.actions';
import { Task } from '../todo/task';

export interface IState {
  tasks: Task[];
  idCounter: number;
}

export const initialState: IState = {
  tasks: [],
  idCounter: 1,
};

export const tasksReducer = createReducer(
  initialState,
  on(addTask, (state, { taskText }) => {
    return produce(state, (draftState) => {
      draftState.tasks.push({ id: draftState.idCounter, pending: true, text: taskText });
      draftState.idCounter++;
    });
  }),
  on(clearAllTasks, (state) => {
    return produce(state, (draftState) => {
      draftState.tasks = [];
      draftState.idCounter = 1;
    });
  }),
  on(removeTask, (state, { taskId }) => {
    return produce(state, (draftState) => {
      draftState.tasks = draftState.tasks.filter((task) => task.id !== taskId);
    });
  }),
  on(toggleTask, (state, { taskId }) => {
    return produce(state, (draftState) => {
      let targetTask = draftState.tasks.find((task) => taskId === task.id);
      if (targetTask) targetTask.pending = !targetTask.pending;
    });
  })
);
