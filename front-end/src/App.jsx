import './App.css';
import TaskContainer from './taskContainer/TaskContainer';
//brings in the stateful component


function App() {
  return (
    <div className="App">
      <h1>Task App</h1>
      <TaskContainer></TaskContainer>
    </div>
  );
}

export default App;
