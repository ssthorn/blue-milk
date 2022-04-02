import './App.css';
import TaskContainer from './taskContainer/TaskContainer';
import UserContainer from './userContainer/UserContainer';

//brings in the stateful component


function App() {
  
  return (
    <div className="App">
      <section className="top-bar">
      <h1>Task App</h1>
      
      

      </section>
      <UserContainer></UserContainer>
      <TaskContainer></TaskContainer>
      
      
    </div>
  );
}

export default App;
