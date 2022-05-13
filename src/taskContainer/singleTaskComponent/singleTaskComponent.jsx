import React, {useState} from "react";


const SingleTaskComponent = (props) => {
    const [isvalidState, setIsValidState] = useState({valid: true, message:""})

    const[showing, setShowing] = useState(false)
    const toggleShowing = () => {
        
        setShowing(!showing)
    }
    const[updateTask, setUpdateTask] = useState({
        taskName: props.task.taskName,
        description: props.task.description,
        _id: props.task._id,
        category: props.task.category,
        complete: props.task.complete,
        taskColor: props.task.taskColor
    })
    const handleInputChange = (e) => {
        setUpdateTask({
            ...updateTask,
            [e.target.name]: e.target.value
        })
        
    }
    const submitUpdateTask = (e) => {
        e.preventDefault();
        props.updateTask(props.task._id, updateTask)
        setShowing(false)
        
    }
    const tDescription = props.task.description
    const tName = props.task.taskName
    const tID = props.task._id
    // const tCategory = props.task.category
    const tDelete = props.deleteTask
    // let tComplete = props.task.complete
    let tColor = props.task.taskColor

    //random color function
    const letters = '0123456789ABCDEF';
    let hash = '#';
    const [color, setColor] = useState("color")
    const changeColor = () => {
        
        for (let i = 0; i < 6; i++) {
            hash += letters[Math.floor(Math.random() * 16)];
        }
        setColor(hash)
        if(tColor !== color){
            console.log("not the same")
        }else{
            console.log("looks good")

        }
    }
    
    
    return (
        <>
        <div className="index-single-task">
            <fieldset style={{background: tColor}}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg> */}
                <legend style={{color: tColor}}>{tName}</legend>
                {tDescription.length > 0 
            ?   <div className="index-single-task-details">
                    <h2>{tDescription}</h2>
                </div>
            :   <p>task has no description</p>
                }
                
                {
            showing 
            ?
            <div id="edit-task-form">
                <svg className="close-button" onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
                {/* <p id="date"></p> */}
                <form onSubmit={submitUpdateTask}>
                    <select name="usersAtTask" id="usersAtTask">
                        
                        <option value="">User</option>
                    </select>
                    <select onClick={handleInputChange} name="complete" id="complete">
                        <option value={null}>Completion Status</option>
                        <option name="complete" value={true}>Complete</option>
                        <option name="complete" value={false}>Incomplete</option>
                    </select><br></br>
                    { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                    
                    <label htmlFor="taskName">Title</label><br></br>
                    <input onChange={handleInputChange} type="text" name="taskName" id="taskName" value={updateTask.taskName}/><br></br>
                    
                
                    <label htmlFor="description">Description</label><br></br>
                    <textarea onChange={handleInputChange} maxLength="100" type="text" name="description" id="description" value={updateTask.description}></textarea><br></br>
                    
                    
                    <label htmlFor="taskColor">Preview:</label>
                    
                <button  className="color-button"
                type="button" 
                name="taskColor"
                id="taskColor"
                onClick={handleInputChange} 
                onMouseDown={changeColor}
                style={{background: color}} 
                value={updateTask.taskColor}>
                    {color}
                </button>
                <select onChange={handleInputChange} name="taskColor" id="taskColor">
                    <option name="taskColor" value={color} style={{background: tColor}}>Apply Color</option>
                    <option name="taskColor" value={color} style={{background: color}}>Apply</option>
                </select>

                {/* <select onClick={handleInputChange} name="complete" id="complete">
                    <option value={null}>Completion Status</option>
                    <option name="complete" value={true}>Complete</option>
                    <option name="complete" value={false}>Incomplete</option>
                </select> */}
                <br></br>

                <button type="submit">Save</button>   
                </form>
                <button  style={{color: tColor}} onClick={()=>{tDelete(tID)}}>Delete</button>
            </div>
            
            :<svg onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
            }
            </fieldset>
            <form onSubmit={submitUpdateTask}>

            </form>
        </div>
    </>  
    )
    
}

export default SingleTaskComponent