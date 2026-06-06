// src/components/TaskList.tsx
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { updateTaskState } from '../store';
import Task from './Task';

export default function TaskList() {
  // 1. 🔴 从 Redux 全局仓库里捞出真实的 tasks 数据
  const tasks = useSelector((state: RootState) => state.taskbox.tasks);
  // 🔴 从仓库里捞出当前的加载状态（默认为 idle）
  const status = useSelector((state: RootState) => state.taskbox.status);

  const dispatch = useDispatch();

  // 2. 🔴 当用户在子组件里点击置顶时，向仓库发射“置顶”动作
  const onPinTask = (id: string) => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_PINNED' }));
  };

  // 🔴 当用户点击勾选时，向仓库发射“归档”动作
  const onArchiveTask = (id: string) => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  // 根据仓库里的状态判断是否显示骨架屏
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow} {LoadingRow} {LoadingRow}
        {LoadingRow} {LoadingRow} {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  // 排序逻辑保持不变：置顶的依然排在最前面
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(id) => onPinTask(id)}
          onArchiveTask={(id) => onArchiveTask(id)}
        />
      ))}
    </div>
  );
}