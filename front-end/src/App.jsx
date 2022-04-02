import './App.css';
import TaskContainer from './taskContainer/TaskContainer';

//brings in the stateful component


function App() {
  
  return (
    <div className="App">
      <section className="top-bar">
      <h1>Task App</h1>
      
      

      </section>
      
      <TaskContainer></TaskContainer>
      
      
    </div>
  );
}

export default App;
