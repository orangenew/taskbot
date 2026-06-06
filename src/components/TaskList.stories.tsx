// src/components/TaskList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import TaskList from './TaskList';
import type { TaskData } from '../types';

// 1. 在 Story 内部专门临时定制一套各种场景的“假仓库”
const MockedState = {
  tasks: [
    { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
    { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
    { id: '3', title: 'Task 3', state: 'TASK_INBOX' },
    { id: '4', title: 'Task 4', state: 'TASK_INBOX' },
    { id: '5', title: 'Task 5', state: 'TASK_INBOX' },
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ] as TaskData[],
  status: 'idle',
  error: null,
};

// 2. 一个用来快速生成 Mock Store 的工厂函数
const makeMockStore = (initialState: typeof MockedState) => {
    return configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState,
          reducers: {
            // 👈 把真实的逻辑搬过来，这样在 Storybook 里点击也能实时排序了！
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
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  tags: ["autodocs"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 场景 1：默认列表（喂入带有 6 个任务的假仓库）
export const Default: Story = {
  decorators: [
    (story) => <Provider store={makeMockStore(MockedState)}>{story()}</Provider>,
  ],
};

// 场景 2：有置顶任务的列表（因为 MockedState 里已经带有置顶了，直接复用或定制）
export const WithPinnedTasks: Story = {
  decorators: [
    (story) => <Provider store={makeMockStore(MockedState)}>{story()}</Provider>,
  ],
};

// 场景 3：加载中（把数据清空，把 status 改为 loading）
export const Loading: Story = {
  decorators: [
    (story) =>
      <Provider
        store={makeMockStore({
          ...MockedState,
          tasks: [],
          status: 'loading',
        })}
      >
        {story()}
      </Provider>,
  ],
};

// 场景 4：空状态
export const Empty: Story = {
  decorators: [
    (story) =>
      <Provider
        store={makeMockStore({
          ...MockedState,
          tasks: [],
          status: 'idle',
        })}
      >
        {story()}
      </Provider>,
  ],
};