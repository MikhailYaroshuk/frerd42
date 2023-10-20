import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TasksState {
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

    // addTask: (state, action: PayloadAction<string>) => {
    //   const id = state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1;
    //   const newTask = { id, text: action.payload, done: false };
    
    //   state.tasks.push(newTask);
    
    //   // Reorder tasks so completed tasks are at the end with done === true
    //   const completedTasks = state.tasks.filter(task => task.done);
    //   const incompleteTasks = state.tasks.filter(task => !task.done);
    
    //   state.tasks = [...incompleteTasks, ...completedTasks.map(task => ({ ...task, done: true }))];
    // },

    // markAsDone: (state, action: PayloadAction<number>) => {
    //   const taskIndex = state.tasks.findIndex((t) => t.id === action.payload);
    
    //   if (taskIndex !== -1) {
    //     const completedTask = state.tasks[taskIndex];
    //     state.tasks.splice(taskIndex, 1);
    
    //     const completedTasks = state.tasks.filter((t) => t.done);
    //     const incompleteTasks = state.tasks.filter((t) => !t.done);
    
    //     state.tasks = [...incompleteTasks, completedTask, ...completedTasks];
    //     state.tasks[taskIndex].done = true;
    //   }
    // },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, markAsDone, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;