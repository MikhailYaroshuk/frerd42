import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Task, deleteTask, markAsDone } from '../../store/slices/tasksSlice';
import './TaskList.scss';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleMarkAsDone = (id: number) => {
    dispatch(markAsDone(id));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="task-list">
      {tasks.map((task: Task) => (
        <div className="task" key={task.id}>
          <span className={`task-text ${task.done ? 'completed' : ''}`}>
            {task.text}
          </span>
          <div className="task-buttons">
            <button className="mark-as-done" onClick={() => handleMarkAsDone(task.id)} disabled={task.done}>Mark as Done</button>
            <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
