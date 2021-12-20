import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { Task } from '../task';
import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-list-buttons',
  template: '<ul></ul>',
})
class MockListButtons {
  @Output()
  public onButtonClick = new EventEmitter<number>();

  public onClick(): void {
    this.onButtonClick.emit(2);
  }
}

describe('TodoBoardComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let dummyTask: Task;
  let mockListButtons: MockListButtons;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, MockListButtons],
      schemas: [NO_ERRORS_SCHEMA],
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
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add button should call addTask method', fakeAsync(() => {
    spyOn(component, 'addTask');
    const btn = fixture.debugElement.query(By.css('.btn--add'));
    btn.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.addTask).toHaveBeenCalled();
  }));

  it('Add button should add a task', () => {
    component.addTask(new Event('click'), dummyTask.text);
    expect(component.tasks.length).toBe(1);
  });

  it('Clear all button should create a task', () => {
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

  it('Should receive correct emit from listButtons component', () => {
    const childComponent = fixture.debugElement.query(By.directive(MockListButtons));
    mockListButtons = childComponent.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onButtonClick');
    mockListButtons.onClick();
    expect(component.onButtonClick).toHaveBeenCalledWith(2);
  });
});
