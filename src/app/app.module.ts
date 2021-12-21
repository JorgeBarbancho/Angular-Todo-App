import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './state/tasks.reducer';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ListButtonsComponent } from './list-buttons/list-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, TodoComponent, ListButtonsComponent],
  imports: [BrowserModule, FontAwesomeModule, StoreModule.forRoot({ tasks: tasksReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
