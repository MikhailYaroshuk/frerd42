import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Task, deleteTask, markAsDone, markAsUndone } from '../../store/slices/tasksSlice';
import './TaskList.scss';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleMarkAsDone = (id: number) => {
    dispatch(markAsDone(id));
  };

  const handleMarkAsUndone = (id: number) => {
    dispatch(markAsUndone(id));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const completedTasks = tasks.filter(task => task.done);
  const incompleteTasks = tasks.filter(task => !task.done);

  return (
    <div className="task-list">
      {!!incompleteTasks.length && (
        <div className="title">To Do</div>
      )}
      {incompleteTasks.map((task: Task) => (
        <div className="task" key={task.id}>
          <span className="task-text">
            {task.text}
          </span>
          <div className="task-buttons">
            <button className="mark-as-done" onClick={() => handleMarkAsDone(task.id)} disabled={task.done}>Done</button>
            <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}

      {!!completedTasks.length && (
        <div className="title">Completed</div>
      )}

      {completedTasks.map((task: Task) => (
        <div className="task completed" key={task.id}>
          <span className="task-text completed">
            {task.text}
          </span>
          <div className="task-buttons">
            <button className="mark-as-undone" onClick={() => handleMarkAsUndone(task.id)}>Undone</button>
            <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
