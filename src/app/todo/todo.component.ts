import {Component} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Task} from '../task';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
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
        text: newTask
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
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.updatePendingTasksText();
  }

  public showAll = () => {

    this.showingAll = true;
    this.showingPending = false;
    this.showingCompleted = false;
    console.log(this.showingAll)
    console.log(this.showingCompleted)
    console.log(this.showingPending)
  }

  public showCompleted(): void {

    this.showingAll = false;
    this.showingCompleted = true;
    this.showingPending = false;
    console.log(this.showingAll)
    console.log(this.showingCompleted)
    console.log(this.showingPending)
  }

  public showPending(): void {

    this.showingAll = false;
    this.showingPending = true;
    this.showingCompleted = false;
    console.log(this.showingAll)
    console.log(this.showingCompleted)
    console.log(this.showingPending)
  }

  private updatePendingTasksText(): void {
    this.pendingTasksCount = this.tasks.filter(task => task.pending).length
    this.pendingTasksText = this.pendingTasksCount === 1 ? 'task' : 'tasks';
  }
}
