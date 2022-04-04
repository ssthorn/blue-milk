import {useState, useEffect} from 'react'
import SingleTaskComponent from './singleTaskComponent/singleTaskComponent'
import NewTaskComponent from './newTaskComponent/NewTaskComponent'

const TaskContainer = () => {
    const [requestError, setRequestError] =useState("")
    const [tasks, setTasks] = useState([])
    const [newTaskServerError, setNewTaskServerError] = useState("")
    const CreateNewTask = async (newTask) => {
        const apiResponse = await fetch("http://localhost:3001/tasks",{
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            setTasks([parsedResponse.data, ...tasks])
        }else{
            setNewTaskServerError(parsedResponse.data)
        }
    }
    const deleteTask = async (idToDelete) => {
        try{
            const apiResponse = await fetch(`http://localhost:3001/tasks/${idToDelete}`,{
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newTasks = tasks.filter(task => task._id !== idToDelete)
                setTasks(newTasks)
            }
        }catch(err){
            console.log(err)
        }
        
        console.log("deleting task ID" + idToDelete)
        
    }
    const getTasks = async () => {
        try{
            const tasks = await fetch("http://localhost:3001/tasks")
            const parsedTasks = await tasks.json();
            setTasks(parsedTasks.data)
        }catch(err){
            console.log(err)
        }
    }
    const updateTask = async (idToUpdate, taskToUpdate) => {
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
        setTasks(newTasks)
    }else{
        setRequestError(parsedResponse.data)
    }
}  
useEffect(()=>{
    getTasks()
}, [])
    return (
        <div className='task-container'>
                <NewTaskComponent
                newTaskServerError={newTaskServerError}
                CreateNewTask={CreateNewTask}
                ></NewTaskComponent>
            {tasks.reverse().map((task) => {
                return <SingleTaskComponent 
                key={task._id} 
                task={task} 
                deleteTask={deleteTask} 
                updateTask={updateTask}
                ></SingleTaskComponent>
            })}
        </div>   
    )
}
export default TaskContainer