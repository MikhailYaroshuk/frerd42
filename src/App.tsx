import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="tasks-wrapper">
        <h1>Simple Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
};

export default App;