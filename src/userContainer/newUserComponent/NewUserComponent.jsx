import { useState } from "react"

const NewUserComponent = (props) => {
    const[showing, setShowing] = useState(false)
    const [color, setColor] = useState("color")

    const [isvalidState, setIsValidState] = useState({valid: true, message:""})
    const[newUser, setNewUser] = useState({
        userName:"",
        userColor:color,
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
    //random color function
    const letters = '0123456789ABCDEF';
    let hash = '#';
    
    const changeColor = () => {
        
        for (let i = 0; i < 6; i++) {
            hash += letters[Math.floor(Math.random() * 16)];
        }
    }
    
    return (
        <>
        {
            showing 
            ?   <div className="new-user-form">
                    <form id="newUserForm" onSubmit={submitNewUser}>
                        <fieldset className="new-user-field">
                            <svg className="close-button" onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                            
                            { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                            { props.newUserServerError ? <p className="form-error">{props.newUserServerError}</p> : null}
                            
                            <input onChange={handleInputChange} type="text" name="userName" id="userName" placeholder="Name"value={newUser.userName}/>
                            
                            <button className= "submit-button" type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></button>

                        </fieldset>
                    </form>
                </div>
               
            :    <svg className="new-user-button" onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f5f5dc"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
        }  
        </>
    )
    
}
export default NewUserComponent