import {useState, useEffect} from 'react'
import SingleUserComponent from './singleUserComponent/SingleUserComponent'
import NewUserComponent from './newUserComponent/NewUserComponent.jsx'

const UserContainer = () => {
    const [requestError, setRequestError] =useState("")
    const [users, setUsers] = useState([])
    const [newUserServerError, setNewUserServerError] = useState("")
    const CreateNewUser = async (newUser) => {
        const apiResponse = await fetch("https://serene-bayou-27727.herokuapp.com/users",{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            setUsers([parsedResponse.data, ...users])
        }else{
            setNewUserServerError(parsedResponse.data)
        }
    }
    const deleteUser = async (idToDelete) => {
        try{
            const apiResponse = await fetch(`https://serene-bayou-27727.herokuapp.com/users/${idToDelete}`,{
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newUsers = users.filter(user => user._id !== idToDelete)
                setUsers(newUsers)
            }
        }catch(err){
            console.log(err)
        }
        console.log("deleting user ID" + idToDelete)
    }
    const getUsers = async () => {
        try{
            const users = await fetch("https://serene-bayou-27727.herokuapp.com/users")
            const parsedUsers = await users.json();
            setUsers(parsedUsers.data)
        }catch(err){
            console.log(err)
        }
    }
    const updateUser = async (idToUpdate, userToUpdate) => {
        const apiResponse = await fetch(`https://serene-bayou-27727.herokuapp.com/users/${idToUpdate}`,{
            method:"PUT",
            body: JSON.stringify(userToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if(parsedResponse.success){
            const newUsers = users.map(user => user._id === idToUpdate ? userToUpdate : user)
        setUsers(newUsers)
    }else{
        setRequestError(parsedResponse.data)
    }
}  
useEffect(()=>{
    getUsers()
}, [])
    return (
        <div className='user-container'>
            <NewUserComponent
            newUserServerError={newUserServerError}
            CreateNewUser={CreateNewUser}
            ></NewUserComponent>
        
            {users.map((user) => {
                return <SingleUserComponent 
                key={user._id} 
                user={user} 
                deleteUser={deleteUser} 
                updateUser={updateUser}
                ></SingleUserComponent>
            })}
        </div>
    )
}
export default UserContainer