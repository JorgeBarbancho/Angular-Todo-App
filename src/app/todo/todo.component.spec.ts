import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { Task } from './task';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from '../state/tasks.reducer';
import { tasksFilterReducer } from '../state/task-filter.reducer';

@Component({
  selector: 'app-list-buttons',
  template: '<ul></ul>',
})
class MockListButtons {
  @Output()
  public onButtonClick = new EventEmitter<number>();

  public onClick(): void {
    this.onButtonClick.emit(1);
  }
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let dummyTask: Task;
  let mockListButtons: MockListButtons;

  function getTaskCount() {
    return fixture.debugElement.queryAll(By.css('.todo-component__todo-item')).length;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, MockListButtons],
      imports: [StoreModule.forRoot({ tasks: tasksReducer, filter: tasksFilterReducer })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    dummyTask = {
      id: 1,
      pending: true,
      text: 'dummy task',
    };
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add button should add a task', fakeAsync(() => {
    //Given
    const btn = fixture.debugElement.nativeElement.querySelector('.btn--add');
    const todoInput = fixture.debugElement.query(By.css('.todo-component__input'));
    const inputEl = todoInput.nativeElement;
    inputEl.value = 'testValue';
    expect(getTaskCount()).toBe(0);

    //When
    btn.click();
    tick();
    fixture.detectChanges();

    //Then
    expect(getTaskCount()).toBe(1);
  }));

  it('Clear all button clear all tasks', () => {
    //Given
    component.addTask(new Event('click'), dummyTask.text);
    fixture.detectChanges();
    expect(getTaskCount()).toBe(1);

    //When
    component.clearAll();
    fixture.detectChanges();

    //Then
    expect(getTaskCount()).toBe(0);
  });

  it('Checkbox should toggle task completion', () => {
    //Given
    component.addTask(new Event('click'), dummyTask.text);
    let testTasks: Task[] = [];
    component.tasks$.subscribe((tasks) => (testTasks = tasks));
    fixture.detectChanges();
    expect(getTaskCount()).toBe(1);
    const checkbox = fixture.debugElement.nativeElement.querySelector('input[type=checkbox]');
    expect(testTasks[0].pending).toBeTrue();

    //When
    checkbox.click();

    //Then
    expect(testTasks[0].pending).toBeFalse();
    checkbox.click();
    expect(testTasks[0].pending).toBeTrue();
  });

  it('Trash button should remove a task', () => {
    //Given
    component.addTask(new Event('click'), dummyTask.text);
    fixture.detectChanges();
    expect(getTaskCount()).toBe(1);
    const trashBtn = fixture.debugElement.nativeElement.querySelector('.todo-component__trash-btn');

    //When
    trashBtn.click();
    fixture.detectChanges();

    //Then
    expect(getTaskCount()).toBe(0);
  });

  it('Should receive correct emit from listButtons component', () => {
    //Given
    const childComponent = fixture.debugElement.query(By.directive(MockListButtons));
    let todoItems = fixture.debugElement.queryAll(By.css('.todo-component__todo-item'));
    mockListButtons = childComponent.componentInstance;
    component.addTask(new Event('click'), dummyTask.text);
    fixture.detectChanges();
    expect(getTaskCount()).toBe(1);
    expect(todoItems.length).toBe(0);

    //When
    mockListButtons.onClick();
    fixture.detectChanges();

    //Then
    todoItems = fixture.debugElement.queryAll(By.css('.todo-component__todo-item'));
    expect(todoItems.length).toBe(0);
  });
});
