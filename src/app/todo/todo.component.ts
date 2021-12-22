import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faList, faTasks, faTh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListButton } from '../list-buttons/list-button';
import { Store } from '@ngrx/store';
import { addTask, clearAllTasks, removeTask, toggleTask } from '../state/tasks.actions';
import { filterTasks, selectPendingTasks } from '../state/tasks.selectors';
import { changeFilter } from '../state/task-filter.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  // Readonly view variables
  public readonly faTrash = faTrash;

  // State
  public tasks$ = this.store.select(filterTasks);
  public pendingTasks$ = this.store.select(selectPendingTasks);
  public showWarning: boolean = false;

  // List buttons config
  public buttons: ListButton[] = [
    { icon: faTh, selected: true },
    { icon: faTasks, selected: false },
    { icon: faList, selected: false },
  ];

  constructor(private store: Store) {}

  public addTask(e: Event, newTask: string): void {
    e.preventDefault();
    const taskText = newTask.trim();
    if (!newTask) {
      this.showWarning = true;
    } else {
      this.store.dispatch(addTask({ taskText }));
      this.showWarning = false;
    }
  }

  public clearAll(): void {
    this.store.dispatch(clearAllTasks());
  }

  public toggleTask(taskId: number): void {
    this.store.dispatch(toggleTask({ taskId }));
  }

  public removeTask(taskId: number): void {
    this.store.dispatch(removeTask({ taskId }));
  }

  public onButtonClick(buttonIdx: number): void {
    this.buttons = this.buttons.map((button, idx) => {
      return {
        icon: button.icon,
        selected: (button.selected = buttonIdx === idx),
      };
    });
    this.store.dispatch(changeFilter({ buttonIdx }));
  }
}
