// src/components/Task.tsx

// 🔴 把你之前顶部的这个类型定义安全地放回来
export type TaskData = {
    id: string;
    title: string;
    state: 'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED';
  };
  
  interface TaskProps {
    task: TaskData;
    onArchiveTask: (id: string) => void;
    onPinTask: (id: string) => void;
  }
  
  export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }: TaskProps) {
    return (
      <div className={`list-item ${state}`}>
        <label className="checkbox" onClick={() => onArchiveTask(id)}>
          <input
            type="checkbox"
            checked={state === 'TASK_ARCHIVED'}
            readOnly={true}
            name="checked"
          />
          <span className="checkbox-custom" />
        </label>
  
        <div className="title">
          <input
            type="text"
            value={title}
            readOnly={true}
            placeholder="Input title"
            style={{ textOverflow: 'ellipsis' }}
          />
        </div>
  
        <div className="actions" onClick={(event) => event.stopPropagation()}>
          {state !== 'TASK_ARCHIVED' && (
            <button onClick={() => onPinTask(id)} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} key={`pinTask-${id}`}>
              <span className={`icon-star`} />
            </button>
          )}
        </div>
      </div>
    );
  }