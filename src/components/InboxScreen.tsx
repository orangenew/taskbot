// src/components/InboxScreen.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import TaskList from './TaskList';

// 🔴 注意：这里必须是 export default ！！
export default function InboxScreen() {
  // 从全局数据中心捞出当前的错误状态
  const error = useSelector((state: RootState) => state.taskbox.error);

  // 场景 A：如果发生错误，渲染全屏报错的 UX 界面
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    );
  }

  // 场景 B：正常情况，渲染完整的 App 界面（带顶栏导航和列表）
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}