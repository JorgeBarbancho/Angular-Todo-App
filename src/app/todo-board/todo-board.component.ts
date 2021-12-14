import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Task} from '../task';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.css']
})
export class TodoBoardComponent implements OnInit {

  faTrash = faTrash;
  tasks: Task[] = [];
  idCounter: number = 1;
  pendingTasksCount: number = 0;
  pendingTasksText: string = 'tasks';
  showingAll: boolean = true;
  showingPending: boolean = false;
  showingCompleted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  addTask(e: Event, newTask: string): void {
    e.preventDefault();
    this.tasks.push({id: this.idCounter, pending: true, text: newTask});
    this.updatePendingTasksText();
    this.idCounter++;
  }

  toggleTask(task: Task): void {
    task.pending = !task.pending;
    this.updatePendingTasksText();
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.updatePendingTasksText();
  }

  updatePendingTasksText(): void {
    this.pendingTasksCount = this.tasks.filter(task => task.pending).length
    this.pendingTasksText = this.pendingTasksCount === 1 ? 'task' : 'tasks';
  }

  showAll(): void {
    this.showingAll = true;
    this.showingPending = false;
    this.showingCompleted = false;
  }

  showCompleted(): void {
    this.showingAll = false;
    this.showingPending = false;
    this.showingCompleted = true;
  }

  showPending(): void {
    this.showingAll = false;
    this.showingPending = true;
    this.showingCompleted = false;
  }
}
