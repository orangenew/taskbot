// src/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { TaskData } from './types';

// 👇 核心修复：既然官方的导不出，我们自己手写这个类型的定义！
// 它的结构非常简单：就是一个带有 payload 属性的普通对象
interface CustomPayloadAction<T> {
  type: string;
  payload: T;
}

const defaultTasks: TaskData[] = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: {
    tasks: defaultTasks,
    status: 'idle',
    error: null,
  },
  reducers: {
    // 👇 核心修复：在这里使用我们自己写的 CustomPayloadAction
    // 这样 TaskList.tsx 那边就能完美认出需要传什么参数了，红线立刻消失！
    updateTaskState: (
      state, 
      action: CustomPayloadAction<{ id: string; newTaskState: TaskData['state'] }>
    ) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.state = newTaskState;
      }
    },
  },
});

export const { updateTaskState } = TasksSlice.actions;

export const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;