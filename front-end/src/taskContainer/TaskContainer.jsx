import {useState, useEffect} from 'react'
import SingleTaskComponent from './singleTaskComponent/singleTaskComponent'
//this component will be holding tasks in state
import NewTaskComponent from './newTaskComponent/NewTaskComponent'
import CategoryComponent from '../categoryComponent/CategoryComponent'

const TaskContainer = () => {
    const [requestError, setRequestError] =useState("")
    const [tasks, setTasks] = useState([])
    //setting up state, initially with 'dummy data'
    const [newTaskServerError, setNewTaskServerError] = useState("")
    const CreateNewTask = async (newTask) => {
        //function to create new task
      
        // setTasks([newTask, ...tasks])
        //"if this were only a front-end application, this could be used, and the app would be done..."
        //however, we need to:
        //send a request to our back-end
        const apiResponse = await fetch("http://localhost:3001/tasks",{
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
                //we were having an error with how the request was made..
                //this takes a closer look at what type of content is in the
                //request
            }
        })
        //parse the response from the back-end
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            //if the response is success:
            //add the new task to the state
            //only being put in state if it's good
            setTasks([parsedResponse.data, ...tasks])
        }else{
            //show the error message in the form, don't change it back to showing?
            setNewTaskServerError(parsedResponse.data)
            //"TODO: refactor state from newTaskForm to here, since this is the only place I know whether it worked or not."
        }
    }
    const deleteTask = async (idToDelete) => {
        //delete function to modify state. using a for loop, finds task in array
        //then give this function to the child
        try{
            const apiResponse = await fetch(`http://localhost:3001/tasks/${idToDelete}`,{
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newTasks = tasks.filter(task => task._id !== idToDelete)
                setTasks(newTasks)

                // const newTasks = [];
                // for(let i = 0; i < tasks.length; i++){
                //     if(tasks[i]._id !== taskId){
                //         newTasks.push(tasks[i])
                //     }
                // }
                
                // const newTasks = tasks.filter((task) => {
                //     return task._id !== idToDelete
                // })
                //the next method is with array methods and filer
                //this is a built in method that belongs to every array, like .map
                // const newTasks = tasks.filter(task => task._id !== idToDelete)
                //this is the same method simplified to one line
                //this updates state. next is to get it working on the back end.(back to top)

                // setTasks(newTasks)
            }
        }catch(err){
            console.log(err)
        }
        
        console.log("deleting task ID" + idToDelete)
        
    }
    const getTasks = async () => {
        //this is where we fetch the tasks from the server and set the initial state with them
        try{
            const tasks = await fetch("http://localhost:3001/tasks")
            //fetching our data from db
            const parsedTasks = await tasks.json();
            //our data
            setTasks(parsedTasks.data)
            //defining
        }catch(err){
            console.log(err)
            //otherwise there is an error
        }
    }
    const updateTask = async (idToUpdate, taskToUpdate) => {
        //last route: update

        // const newTasks = [];
        // for(let i = 0; i < tasks.length; i++){
        //     //expecting this to be the task from the form
        //     if(tasks[i]._id === idToUpdate._Id){
        //         //if the task i'm at is the one i want to update
        //         newTasks.push(taskToUpdate)
        //         //put the new version in to this array
        //     }else{
        //         newTasks.push(tasks[i])
        //     }    
        // }
        //first method ^
        const apiResponse = await fetch(`http://localhost:3001/tasks/${idToUpdate}`,{
            method:"PUT",
            body: JSON.stringify(taskToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if(parsedResponse.success){
            const newTasks = tasks.map(task => task._id === idToUpdate ? taskToUpdate : task)
        //one line version of above
        //now pass it down to the child...
        setTasks(newTasks)
        //call set function
    }else{
        setRequestError(parsedResponse.data)
    }
}  
    useEffect(getTasks, [])
    //this is so the it happens when the page loads
    
    return (
        <div className='task-container'>
            
            <div className='test'>
                <NewTaskComponent
                newTaskServerError={newTaskServerError}
                CreateNewTask={CreateNewTask}
                
                ></NewTaskComponent>
            </div>
            {tasks.reverse().map((task) => {
            //function that maps over an array
                return <SingleTaskComponent 
                key={task._id} 
                task={task} 
                deleteTask={deleteTask} 
                updateTask={updateTask}
                
                ></SingleTaskComponent>
                        
                // <p key={task._id}> {task.taskName}: {task.description}</p>
                //boilerplate to test with 'dummy data' first with {JSON.stringify(task)}
                //then specific keys accessed with a "key=" called
                // return is expected from .map
                //once SingleTaskComponent is build, we can return it. 1:12:57                                  

            })}
        </div>
        
    )
}


export default TaskContainer