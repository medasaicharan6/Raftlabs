import React, { useState, useContext } from 'react'
import './JoinPage.css'
import {UsersContext} from './startPage'

export const JoinPage = ({setJoin}) => {
    const [UsersList,setUsersList] = useContext(UsersContext)
    const [Add, setAdd] = useState(false)
    const HandleNameChange = (e)=>{
        e.preventDefault()
        if(Object.keys(UsersList).includes(e.target.value)===true){
            alert("Name already exists")
        }
    }
    const HandleAdd = (e)=>{
        e.preventDefault()
        const nameInput=document.getElementById("name_input")
        const newUserName = nameInput.value
        if(Object.keys(UsersList).includes(newUserName)===true || newUserName===""){
            alert("You have not entered or Name " + newUserName + " already exists, change the name and try again")
        }
        else{
            const SelectionInput=document.getElementById("Selection")
            const newUserFriend= SelectionInput.value
            if (Object.keys(UsersList).includes(newUserFriend)===true){
                const newUserFriend_List=[...UsersList[newUserFriend],newUserName]
                const newUsersList={...UsersList}
                newUsersList[newUserName]=[newUserFriend]
                newUsersList[newUserFriend]=newUserFriend_List
                setUsersList(newUsersList)
                nameInput.value=""
                SelectionInput.value=null
                setAdd(true)
            }
            else{
                alert("Select your friend to continue")
            }
        }
    }
    const HandleRevertHome = ()=>{
        setAdd(false)
        setJoin(false)
    }
    sessionStorage.setItem("UsersList",JSON.stringify(UsersList))
    if (Add===false){
        return (
            <div className="buttons-container">
                <div className="button-box">
                    <p className="heading">Join</p>
                    <form>
                        <label htmlFor="name_input">Name </label>
                        <input id="name_input" onBlur={(e)=>HandleNameChange(e)} placeholder="Enter your name"/><br/>
                        <br/>
                        <label htmlFor="Selection">Reffered By </label>
                        <select id="Selection">
                            <option default value="-- select your friend --"> -- select your friend -- </option>
                            {Object.keys(UsersList).map(user=>(
                                <option value={user} placeholder="Select your friend">{user}</option>
                            ))}
                        </select><br/>
                        <br/>
                        <button onClick={(e)=>HandleAdd(e)} className="buttons">Add</button>
                        <button onClick={()=>setJoin(false)} className="buttons">Cancel</button>
                    </form>
                </div>
                <div className="button-box1">
                    <p>You can join in ABC community only if you already have a friend in our community, To join enter your name, select your friend who reffered you and click Add button.</p>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="Joinedbox">
                <p style={{color:'green'}}>You are successfully joined in ABC community</p>
                <button onClick={HandleRevertHome} className="Hbutton">Home</button>
            </div>
        )
    }
}
