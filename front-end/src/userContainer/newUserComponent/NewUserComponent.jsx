import { useState } from "react"

const NewUserComponent = (props) => {
    const[showing, setShowing] = useState(false)

    const [isvalidState, setIsValidState] = useState({valid: true, message:""})
    const[newUser, setNewUser] = useState({
        userName:"",
        userColor:"",
        tasksTaken:""
    })
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setNewUser()
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
    const submitNewUser = (e) =>{
        e.preventDefault()
            let validSubmission = true;
            if(newUser.userName.length < 2){
                setIsValidState({
                    valid: false,
                    message: "name needs to be longer"
                })
                validSubmission = false;
            }
            
            if(validSubmission){
                props.CreateNewUser(newUser)
            setNewUser({
                userName:"",
                userColor:"",
                tasksTaken:""
            })
            setIsValidState({
                valid: true,
                message: ""
            })

            setShowing(false)
        }
    }
    return (
        <>
        {
            showing 
            ?   <div className="new-user-form">
                    <form onSubmit={submitNewUser}>
                        <fieldset className="new-user-field">
                            <button className="close-button" onClick={toggleShowing}>Close</button><br></br>
                            { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                            { props.newUserServerError ? <p className="form-error">{props.newUserServerError}</p> : null}
                            <label htmlFor="userName">User:</label>
                            <input onChange={handleInputChange} type="text" name="userName" id="userName" value={newUser.userName}/><br></br>
                            
                            <br></br>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </div>
            :   <button className="new-user-button" onClick={toggleShowing}>New User</button>

        }  
        </>
    )
    
}
export default NewUserComponent