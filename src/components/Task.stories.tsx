// src/components/Task.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Task from './Task';

// 伪造组件需要的点击事件（点击归档、点击置顶）
export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

const meta = {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
  excludeStories: /.*Data$/, // 告诉 Storybook 带有 Data 结尾的导出不是 Story，别展示在左侧
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// 状态 1：默认状态
export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

// 状态 2：置顶状态（复用默认状态的数据，只改了 state）
export const Pinned: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  },
};

// 状态 3：已归档状态
export const Archived: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
};