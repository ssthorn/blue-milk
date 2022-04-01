import './App.css';
import TaskContainer from './taskContainer/TaskContainer';
import CommentComponent from './commentComponent';
//brings in the stateful component


function App() {
  
  return (
    <div className="App">
      <h1>Task App</h1>
      <TaskContainer></TaskContainer>
      <CommentComponent></CommentComponent>
      
    </div>
  );
}

export default App;
