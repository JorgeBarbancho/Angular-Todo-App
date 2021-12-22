import { initialState, IState, tasksReducer } from './tasks.reducer';
import { addTask, clearAllTasks, removeTask, toggleTask } from './tasks.actions';
import { filterTasks, selectTasks } from './tasks.selectors';

describe('TaskReducer', () => {
  const newState: IState = {
    tasks: [
      {
        id: 1,
        pending: true,
        text: 'testTask',
      },
    ],
    idCounter: 2,
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      //Given
      const action = {
        type: 'Unknown',
      };
      //When
      const state = tasksReducer(initialState, action);
      //Then
      expect(state).toBe(initialState);
    });
  });

  describe('add task action', () => {
    it('should add a new task', () => {
      //Given
      const action = addTask({ taskText: newState.tasks[0].text });
      //When
      const state = tasksReducer(initialState, action);
      //Then
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('clear all tasks action', () => {
    it('should remove all tasks', () => {
      //Given
      const addAction = addTask({ taskText: newState.tasks[0].text });
      let state = tasksReducer(initialState, addAction);
      expect(state).toEqual(newState);
      //When
      const clearAction = clearAllTasks();
      state = tasksReducer(state, clearAction);
      //Then
      expect(state).toEqual(initialState);
    });
  });

  describe('remove task action', () => {
    it('should remove the correct task', () => {
      //Given
      const addAction = addTask({ taskText: newState.tasks[0].text });
      let state = tasksReducer(initialState, addAction);
      expect(state).toEqual(newState);
      //When
      const removeAction = removeTask({ taskId: 1 });
      state = tasksReducer(state, removeAction);
      //Then
      expect(state).toEqual({
        tasks: [],
        idCounter: 2,
      });
    });
  });

  describe('toggle task action', () => {
    it('should toggle task pending property', () => {
      //Given
      const addAction = addTask({ taskText: newState.tasks[0].text });
      let state = tasksReducer(initialState, addAction);
      expect(state).toEqual(newState);
      expect(state.tasks[0].pending).toBeTrue();
      //When
      const toggleAction = toggleTask({ taskId: 1 });
      state = tasksReducer(state, toggleAction);
      //Then
      expect(state.tasks[0].pending).toBeFalse();
      state = tasksReducer(state, toggleAction);
      expect(state.tasks[0].pending).toBeTrue();
    });
  });
});

describe('Selectors', () => {
  //Given
  const initialState: IState = {
    tasks: [
      {
        id: 1,
        pending: true,
        text: 'testTask1',
      },
      {
        id: 2,
        pending: false,
        text: 'testTask2',
      },
    ],
    idCounter: 3,
  };

  it('should select the task list', () => {
    //When
    const result = selectTasks.projector(initialState);
    //Then
    expect(result.tasks.length).toEqual(2);
    expect(result.tasks[1].id).toEqual(2);
  });

  it('should select all tasks', () => {
    //When
    const result = filterTasks.projector(initialState, 0);
    //Then
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(2);
  });

  it('should select the completed tasks', () => {
    //When
    const result = filterTasks.projector(initialState, 1);
    //Then
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(2);
  });

  it('should select the pending tasks', () => {
    //When
    const result = filterTasks.projector(initialState, 2);
    //Then
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
});
