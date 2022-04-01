import {useState, useEffect} from "react";
//boilerplate

const SingleTaskComponent = (props) => {
    //presentational component that takes care of props
    const [isvalidState, setIsValidState] = useState({valid: true, message:""})

    const[showing, setShowing] = useState(false)
    //setting state for showing
    const toggleShowing = () => {
        // function to toggle state of showing in a button
        
        setShowing(!showing)
        //sets variable equal to its opposite
    }
    const[updateTask, setUpdateTask] = useState({
        taskName: props.task.taskName,
        description: props.task.description,
        _id: props.task._id,
        category: props.task.category,
        complete: props.task.complete
    })
    //setting an object in state, this state keeps track of
    //what the user has put in the form
    //and build this object as the user updates the form
    //the state updates as the user changes it...
    const handleInputChange = (e) => {
        //this gets put in to input of task form
        //handling things in-state is the 'react-y' pattern.
        //that way you can perfrom validations on the front-end
        //before submit is clicked
        //e or event is a listener
        
        setUpdateTask({
            ...updateTask,
            //keep all the old values, and update only the key with the 
            //same name as the input..done with the spread operator.
            [e.target.name]: e.target.value
            //hack-y way of making it accept dots in key names
            //now we are keeping track in state of the form
        })
        
    }
    const submitUpdateTask = (e) => {
        e.preventDefault();
        props.updateTask(props.task._id, updateTask)
        //call function from parent
        setShowing(false)
        
    }
    const tDescription = props.task.description
    const tName = props.task.taskName
    const tID = props.task._id
    const tCategory = props.task.category
    const tDelete = props.deleteTask
    let tComplete = props.task.complete

    // const [color, setColor] = useState("cont")
    
    // const changeColor = () => {
    //     console.log(color)
    //     setColor("cont"+tCategory)
    // }
    // onClick={(e) => {setColor(e.target.value); changeColor()}}
    // className={color}
    
    // useEffect( () => {
    //     // setUpdateTask()
    //     console.log(isComplete + " first isComplete");
    // }, [isComplete + "2nd isComplete"]);
    //     console.log(isComplete + " first isComplete");
    // }, [isComplete + "2nd isComplete"]);
    return (
        <div className="index-single-task">
            <div id="fieldsetbox">
            <fieldset>
                <legend>{tName}</legend>
                {tDescription.length > 0 
            ?   <div className="index-single-task-details">
                    {tDescription}
                    <p >{tCategory}</p>
                </div>
            :   <p>task has no description</p>
                }
                <button onClick={()=>{tDelete(tID)}}>Delete</button>
                {
            showing 
            ?
            <div id="edit-task-form">
                <button onClick={toggleShowing}>X</button>
                <form onSubmit={submitUpdateTask}>
                    { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                    
                    <label htmlFor="taskName">Task Name:</label>
                    <input onChange={handleInputChange} type="text" name="taskName" id="taskName" value={updateTask.taskName}/><br></br>
                    {/* <label htmlFor="description">Description:</label> */}
                    {/* <input onChange={handleInputChange} type="text" name="description" id="description" value={updateTask.description}/><br></br> */}
                    <label htmlFor="category">Category:</label>
                    {/* <input onChange={handleInputChange} type="number" name="category" id="category" value= {updateTask.category}/> */}
                    
                    <select onChange={handleInputChange} type="number" name="category" id="category" value={updateTask.category}>
                        <option className="cont1" value="1">1</option>
                        <option className="cont2" value="2">2</option>
                        <option className="cont3" value="3">3</option>
                    </select>
                    <textarea onChange={handleInputChange} maxlength="204" type="text" name="description" id="description" value={updateTask.description} rows="4" cols="50"></textarea>
                    
                    
                    {/* <input 
                    onClick={handleInputChange}
                    // onClick={toggleComplete}
                    type="radio" 
                    name="complete" 
                    id="complete" 
                    value="true"
                    /> */}
                    {/* <input onChange={handleInputChange} type="text" name="complete" id="complete" value={updateTask.complete}/><br></br> */}

                    <select onClick={handleInputChange} name="complete" id="complete">
                        {/* <option value={updateTask.complete}></option> */}
                        <option value={null}>Completion Status</option>
                        <option name="complete" value={true}>Complete</option>
                        <option name="complete" value={false}>Incomplete</option>
                    </select>
                    <br></br>
                    <button type="submit">Submit</button>   
                </form>
            </div>
            :   <button onClick={toggleShowing}>Edit This Task</button>
            }
            </fieldset>
            </div>
        </div>
    )
}

export default SingleTaskComponent