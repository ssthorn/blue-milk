import React, {useState} from "react";

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
//random color function
const letters = '0123456789ABCDEF';
let hash = '#';
const [color, setColor] = useState("color")
const changeColor = () => {
    
    for (let i = 0; i < 6; i++) {
        hash += letters[Math.floor(Math.random() * 16)];
    }
    setColor(hash)
    
}
    return (
        <>
            <div className="index-single-user">
                    <section className="user-tray">
                        
                       {
                    showing 
                    ?
                    <div id="edit-user-form">
                        
                        <svg className="close-button" onClick={toggleShowing} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>

                        <form onSubmit={submitUpdateUser}>
                            { isvalidState.valid ? null :<p className="form-error">{isvalidState.message}</p>}
                            <ul>
                                <li>{uTaken}</li>
                            </ul>
                            <label htmlFor="userColor">Preview:</label>
                            <button  className="color-button"
                                type="button" 
                                name="userColor"
                                id="userColor"
                                onClick={handleInputChange} 
                                onMouseDown={changeColor}
                                style={{background: color}} 
                                value={updateUser.userColor}>
                                    {color}
                            </button>
                            <select onChange={handleInputChange} name="userColor" id="userColor">
                                <option name="userColor" value={color} style={{background: uColor}}>Apply Color</option>
                                <option name="userColor" value={color} style={{background: color}}>Apply</option>
                            </select>
                            <button className= "submit-button" type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></button>

                        </form>
                            <button  style={{color: uColor}} onClick={()=>{uDelete(uID)}}>Delete</button>
                        </div>
                    : <h4 className="userDisplayName" onClick={toggleShowing} style={{background: uColor}}>{uName}</h4>
                    }
                    
                </section>
                
               
                
            </div>
        </>  
    )
    
}

export default SingleUserComponent