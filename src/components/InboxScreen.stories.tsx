// src/components/InboxScreen.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import InboxScreen from './InboxScreen';
import type { TaskData } from '../types';

// 1. 定义正常情况下的初始假数据
const MockedState = {
  tasks: [
    { id: '1', title: 'Fix the UX microcopy', state: 'TASK_INBOX' },
    { id: '2', title: 'Design the new button hover state', state: 'TASK_INBOX' },
    { id: '3', title: 'Review alignment with engineering', state: 'TASK_INBOX' },
    { id: '4', title: 'Update Storybook configurations', state: 'TASK_INBOX' },
  ] as TaskData[],
  status: 'idle',
  error: null,
};

// 2. 一个用来快速制造页面所需 Redux 环境的工厂函数
const makeMockStore = (initialState: typeof MockedState) => {
  return configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState,
        reducers: {
          updateTaskState: (state, action: any) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
              task.state = newTaskState;
            }
          },
        },
      }).reducer,
    },
  });
};

const meta = {
  component: InboxScreen,
  title: 'InboxScreen',
  tags: ["autodocs"],
} satisfies Meta<typeof InboxScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

// 场景 1：默认正常全屏页面
export const Default: Story = {
  decorators: [
    (story) => <Provider store={makeMockStore(MockedState)}>{story()}</Provider>,
  ],
};

// 场景 2：服务器发生致命错误时的全屏页面
export const Error: Story = {
  decorators: [
    (story) =>
      <Provider
        store={makeMockStore({
          ...MockedState,
          tasks: [],
          error: 'Something went wrong' as any, // 强行注入错误信号
        })}
      >
        {story()}
      </Provider>,
  ],
};