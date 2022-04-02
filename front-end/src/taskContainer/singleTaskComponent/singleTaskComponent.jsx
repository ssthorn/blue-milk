import React, {useState, useEffect} from "react";
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
        complete: props.task.complete,
        taskColor: props.task.taskColor
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
    
    useEffect( () => {
        // changeColor()
        // setColor(tColor)
        console.log(color + " color");
        console.log(tColor +" tColor")
        return () => {
            // console.log("return from color")
        }
    }, [color]);

    // const [resourceType, setResourceType] = useState("")
    // const [items, setItems] = useState([])
    // useEffect( () => {
    //     fetch(`http://localhost:3001/tasks`)
    //     .then(response => response.json())
    //     // .then(json => console.log(json))
    //     .then(json => setItems(json))
        

    //     return () => {
    //         console.log("return from other thing")
    //     }
    // }, [color]);
    // let stringy = JSON.stringify(items)
    return (
        <>
        <div className="index-single-task">
            

            <fieldset style={{background: tColor}}>
                <legend style={{color: tColor}}>{tName}</legend>
                {tDescription.length > 0 
            ?   <div className="index-single-task-details">
                    <h2>{tDescription}</h2>
                </div>
            :   <p>task has no description</p>
                }
                <button  style={{color: tColor}} onClick={()=>{tDelete(tID)}}>Delete</button>
                {
            showing 
            ?
            <div id="edit-task-form">
                <button onClick={toggleShowing}>Close</button>
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
                    <input onChange={handleInputChange} maxLength="100" type="text" name="description" id="description" value={updateTask.description}></input>
                    <input onChange={handleInputChange} type="text" name="taskColor" id="taskColor" value={tColor}/><br></br>
                    
                    <label htmlFor="taskColor">Preview:</label>
                <button  
                type="button" 
                name="taskColor"
                id="taskColor"
                onClick={handleInputChange} 
                onClick={changeColor}
                style={{background: color}} 
                value={updateTask.taskColor}>
                    {color}
                </button>
                <select onChange={handleInputChange} name="taskColor" id="taskColor">
                    {/* <option value={updateTask.complete}></option> */}   
                    <option value={null}>Apply Color</option>
                    <option name="taskColor" value={color} style={{background: color}}>Apply</option>
                </select>

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
            <form onSubmit={submitUpdateTask}>

                {/* <button  
                    type="submit" 
                    name="taskColor"
                    id="taskColor"
                    onChange={handleInputChange} 
                    onClick={(e) => {setColor(e.target.value); changeColor()}}
                    style={{background: color}} 
                    value={color}>
                        {color}
                </button>

                <select onClick={handleInputChange} onChange={changeColor} name="taskColor" id="taskColor">
                    <option value={null}>Color</option>
                    <option name="taskColor" value={color} style={{background: color}}></option>
                </select> */}

            </form>
        </div>
    </>  
    )
    
}

export default SingleTaskComponent