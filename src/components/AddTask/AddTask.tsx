import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/tasksSlice';
import './AddTask.scss';

const AddTask: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  return (
    <form className='add-task' onSubmit={handleSubmit}>
      <input type="text" value={taskText} className="task-input" placeholder="Add a new task..." onChange={(e) => setTaskText(e.target.value)} />
      <button className="add-button" type="submit">Add</button>
    </form>
  );
};

export default AddTask;
