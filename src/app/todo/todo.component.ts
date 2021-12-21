import { Component } from '@angular/core';
import { faList, faTasks, faTh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from './task';
import { ListButton } from '../list-buttons/list-button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask, clearAllTasks, removeTask, toggleTask } from '../state/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  // Readonly view variables
  public readonly faTrash = faTrash;

  // State
  tasks: Observable<Task[]>;
  public showingAll: boolean = true;
  public showingPending: boolean = false;
  public showingCompleted: boolean = false;
  public showWarning: boolean = false;

  // Derived view variables
  public pendingTasksCount: number = 0;
  public pendingTasksText: string = 'tasks';
  private taskArray: Task[] = [];

  // List buttons config
  public buttons: ListButton[] = [
    { icon: faTh, selected: true },
    { icon: faTasks, selected: false },
    { icon: faList, selected: false },
  ];

  // Internal state
  private idCounter: number = 1;

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks = store.select('tasks');
  }

  public addTask(e: Event, newTask: string): void {
    e.preventDefault();
    newTask = newTask.trim();
    if (!newTask) {
      this.showWarning = true;
    } else {
      const task = {
        id: this.idCounter,
        pending: true,
        text: newTask,
      };
      this.store.dispatch(addTask({ task }));
      this.idCounter++;
      this.showWarning = false;
      this.updatePendingTasksText();
    }
  }

  public clearAll(): void {
    this.store.dispatch(clearAllTasks());
    this.updatePendingTasksText();
  }

  public toggleTask(task: Task): void {
    this.store.dispatch(toggleTask({ task }));
    this.updatePendingTasksText();
  }

  public removeTask(task: Task): void {
    this.store.dispatch(removeTask({ task }));
    this.updatePendingTasksText();
  }

  public onButtonClick(buttonIdx: number): void {
    this.buttons.map((button, idx) => {
      button.selected = buttonIdx === idx;
    });
    switch (buttonIdx) {
      case 0:
        this.showingAll = true;
        this.showingCompleted = false;
        this.showingPending = false;
        break;
      case 1:
        this.showingAll = false;
        this.showingCompleted = true;
        this.showingPending = false;
        break;
      case 2:
        this.showingAll = false;
        this.showingCompleted = false;
        this.showingPending = true;
        break;
    }
  }

  private updatePendingTasksText(): void {
    this.tasks.subscribe((result) => (this.taskArray = result));
    this.pendingTasksCount = this.taskArray.filter((task) => task.pending).length;
    this.pendingTasksText = this.pendingTasksCount === 1 ? 'task' : 'tasks';
  }
}
