import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ListButtonsComponent } from './list-buttons/list-buttons.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TodoComponent, ListButtonsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-todo-app');
  });
});
