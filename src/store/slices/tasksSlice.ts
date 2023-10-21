import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const id = state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1;
      state.tasks.push({ id, text: action.payload, done: false });
    },
    markAsDone: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, done: true }
            : task
        )
      };
    },
    markAsUndone: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, done: false }
            : task
        )
      };
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, markAsDone, deleteTask, markAsUndone } = tasksSlice.actions;

export default tasksSlice.reducer;
