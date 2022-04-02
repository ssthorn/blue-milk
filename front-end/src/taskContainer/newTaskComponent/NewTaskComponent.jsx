import { useState } from "react"

const NewTaskComponent = (props) => {
    const[showing, setShowing] = useState(false)
    //setting state for showing

    const [isvalidState, setIsValidState] = useState({valid: true, message:""})
    //state for new task validation. default state is valid, and produces a message
    const[newTask, setNewTask] = useState({
        taskName:"",
        description: "",
        category: "",
        complete: false,
         
    })
    //setting an object in state, this state keeps track of
    //what the user has put in the form
    //and build this object as the user updates the form
    //the state updates as the user changes it...
    
    const toggleShowing = () => {
        // function to toggle state of showing in a button
        //we only want to button to show up as long as we're not
        //showing the form
        setShowing(!showing)
        //sets variable equal to its opposite
    }
    const handleInputChange = (e) => {
        //this gets put in to input of task form
        //handling things in-state is the 'react-y' pattern.
        //that way you can perfrom validations on the front-end
        //before submit is clicked
        //e or event is a listener
        console.log(e.target.value)
        //checking as we work
        setNewTask()
        
        setNewTask({
            ...newTask,
            //keep all the old values, and update only the key with the 
            //same name as the input..done with the spread operator.
            [e.target.name]: e.target.value
            //hack-y way of making it accept dots in key names
            //now we are keeping track in state of the form
        })
    }
    const submitNewTask = (e) =>{
        //"this is a heck of a funciton to be putting inline..."
        //this function is now created to nest the 'monster' function...
        //this long road of front-end validation was gone down as an example...
        //however, putting "Task Name: <input required ..." or "<input minLength={2} down below also works
        e.preventDefault()
            let validSubmission = true;
            //"The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be."
            if(newTask.taskName.length < 2){
                //validation preventing names from being too short
                setIsValidState({
                    //calling down validation function
                    valid: false,
                    message: "name needs to be longer"
                    //presenting message upon validaiton
                })
                validSubmission = false;
                //resetting message. we can't rely on state bc updating state may take more time.
            }
            
            if(validSubmission){
                props.CreateNewTask(newTask)
            //passed along from the parent, the new task
            //if there were more logic here, like validation, we'd probably make another function
            setNewTask({
                //resetting state of form
                taskName:"",
                description: "",
                category: "",
                complete: false
            })
            setIsValidState({
                valid: true,
                message: ""
            })
            //resetting message after validation

            setShowing(false)
            //hides form after submit
        }
    }
    return (
        <>
        {
            showing 
            ?   <div className="new-task-form">
                    <form onSubmit={submitNewTask}>
                        <fieldset>
                            <button className="close-button" onClick={toggleShowing}>Close</button><br></br>
                            { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                            { props.newTaskServerError ? <p className="form-error">{props.newTaskServerError}</p> : null}
                            <label htmlFor="taskName">Task:</label>
                            <input onChange={handleInputChange} type="text" name="taskName" id="taskName" value={newTask.taskName}/><br></br>
                            <label htmlFor="description">Description:</label>
                            <input onChange={handleInputChange} type="text" name="description" id="taskName" value={newTask.description}/><br></br>
                            <label htmlFor="category">Category</label>
                            <select onChange={handleInputChange} type="number" name="category" id="category" value= {newTask.category}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <br></br>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </div>
            // :   <button className="new-task-button" onClick={toggleShowing}>Create New</button>
               : <a href={toggleShowing}><svg className= "new-task-button" onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 0 24 24" width="72px" fill="#f5f5dc"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></a>

            
            
        }  
        </>
    )
    //form to create a new task...
    //no action on form bc the request will be made with fetch to parse response.
    //placed inside a react fragment.  we only want this to show
    //up if a certain condition is true...

}
export default NewTaskComponent