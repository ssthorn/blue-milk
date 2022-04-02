import React, {useState, useEffect} from "react";

const SingleUserComponent = (props) => {
    const [isvalidState, setIsValidState] = useState({valid: true, message:""})
    const[showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const[updateUser, setUpdateUser] = useState({
        userName: props.user.userName,
        userColor: props.user.userColor,
        tasksTaken: props.user.tasksTaken
    })
    
    const handleInputChange = (e) => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateUser = (e) => {
        e.preventDefault();
        props.updateUser(props.user._id, updateUser)
        setShowing(false)
    }
  
    const uName = props.user.userName
    const uID = props.user._id
    const uTaken = props.user.tasksTaken
    const uDelete = props.deleteUser
    
    let uColor = props.user.userColor

    return (
        <>
            <div className="index-single-user">

            <h2 className="users-button" >Users</h2>
                
                    <section>
                        <fieldset style={{background: uColor}}>
                        <legend style={{color: uColor}}>{uName}</legend>
                        {uTaken.length > 0 
                    ?   <div className="index-single-user-details">
                            <span>O</span>
                        </div>
                    :   <p>user has no tasks</p>
                        }
                        
                        {
                    showing 
                    ?
                    <div id="edit-user-form">
                        <button className="close-button" onClick={toggleShowing}>Close</button>
                        <form onSubmit={submitUpdateUser}>
                            { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                            
                            <label htmlFor="userName">User Name:</label>
                            <input onChange={handleInputChange} type="text" name="userName" id="userName" value={updateUser.userName}/><br></br>
                            
                        <button type="submit">Submit</button>   
                        </form>
                        <button  style={{color: uColor}} onClick={()=>{uDelete(uID)}}>Delete</button>
                    </div>
                    :   <div onClick={toggleShowing}></div>
                    }
                    </fieldset>

                </section>
                
               
                
            </div>
        </>  
    )
    
}

export default SingleUserComponent