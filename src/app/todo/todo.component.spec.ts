import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { ListButtonsComponent } from '../list-buttons/list-buttons.component';
import { Task } from '../task';

describe('TodoBoardComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let dummyTask: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, ListButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.tasks = [];
    dummyTask = {
      id: 1,
      pending: true,
      text: 'dummy task',
    };
    fixture.detectChanges();
  });

  /*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('Add button should add a task', () => {
    component.addTask(new Event('click'), dummyTask.text);
    expect(component.tasks.length).toBe(1);
  });

  it('Clear all button should create a tasks', () => {
    component.addTask(new Event('click'), dummyTask.text);
    component.clearAll();
    expect(component.tasks.length).toBe(0);
  });

  it('Checkbox should toggle task completion', () => {
    component.addTask(new Event('click'), dummyTask.text);
    expect(dummyTask.pending).toBeTrue();
    component.toggleTask(dummyTask);
    expect(dummyTask.pending).toBeFalse();
    component.toggleTask(dummyTask);
    expect(dummyTask.pending).toBeTrue();
  });

  it('Trash button should remove a task', () => {
    component.addTask(new Event('click'), dummyTask.text);
    expect(component.tasks.length).toBe(1);
    component.removeTask(dummyTask);
    expect(component.tasks.length).toBe(0);
  });
});
