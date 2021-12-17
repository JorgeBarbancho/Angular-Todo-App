import { Component } from '@angular/core';
import { faList, faTasks, faTh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../task';
import { ListButton } from '../list-button';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  // Readonly view variables
  public readonly faTrash = faTrash;

  // State
  public tasks: Task[] = [];
  public showingAll: boolean = true;
  public showingPending: boolean = false;
  public showingCompleted: boolean = false;
  public showWarning: boolean = false;

  // Derived view variables
  public pendingTasksCount: number = 0;
  public pendingTasksText: string = 'tasks';

  // List buttons config
  public buttons: ListButton[] = [
    { icon: faTh, selected: true },
    { icon: faTasks, selected: false },
    { icon: faList, selected: false },
  ];

  // Internal state
  private idCounter: number = 1;

  public addTask(e: Event, newTask: string): void {
    e.preventDefault();
    newTask = newTask.trim();
    if (!newTask) {
      this.showWarning = true;
    } else {
      this.tasks.push({
        id: this.idCounter,
        pending: true,
        text: newTask,
      });
      this.idCounter++;
      this.showWarning = false;
      this.updatePendingTasksText();
    }
  }

  public clearAll(): void {
    this.tasks = [];
    this.updatePendingTasksText();
  }

  public toggleTask(task: Task): void {
    task.pending = !task.pending;
    this.updatePendingTasksText();
  }

  public removeTask(task: Task): void {
    this.tasks = this.tasks.filter((item) => item.id !== task.id);
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
    this.pendingTasksCount = this.tasks.filter((task) => task.pending).length;
    this.pendingTasksText = this.pendingTasksCount === 1 ? 'task' : 'tasks';
  }
}
