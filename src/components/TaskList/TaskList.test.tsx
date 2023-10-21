

import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import TaskList from './TaskList';
import { markAsDone, markAsUndone, deleteTask, TasksState } from '../../store/slices/tasksSlice';

const mockStore = configureStore([]);

describe('TaskList Component', () => {
  let store: MockStoreEnhanced<{ tasks: TasksState }, {}>;

  beforeEach(() => {
    const initialState: { tasks: TasksState } = {
      tasks: {
        tasks: [
          { id: 1, text: 'Task 1', done: false },
          { id: 2, text: 'Task 2', done: true },
        ],
      },
    };
    store = mockStore(initialState) as any;
  });

  it('dispatches markAsDone action when "Done" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    fireEvent.click(getByText('Done'));
    const actions = store.getActions();
    expect(actions).toContainEqual(markAsDone(1));
  });

  it('dispatches markAsUndone action when "Undone" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    fireEvent.click(getByText('Undone'));
    const actions = store.getActions();
    expect(actions).toContainEqual(markAsUndone(2));
  });

  it('dispatches deleteTask action when "Delete" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    fireEvent.click(screen.getAllByText('Delete')[0]);
    const actions = store.getActions();
    expect(actions).toContainEqual(deleteTask(1));
		fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(actions).toContainEqual(deleteTask(2));
  });
});
