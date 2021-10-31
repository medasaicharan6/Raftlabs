import React, {useContext, useState} from 'react'
import './ConnectionsPage.css'
import {UsersContext} from './startPage'

export const ConnectionsPage = ({setConnections}) => {
    const [UsersList,setUsersList] = useContext(UsersContext)
    const [Check,setCheck] = useState([false])
    const DFS=(start,end,shortest=null,path=[])=>{
        path=[...path,start]
        if (start===end){
            return path
        }
        for (var node of UsersList[start]){
            if (path.includes(node)===false){
                var newPath
                if (shortest===null || path.length<shortest.length){
                    newPath=DFS(node,end,shortest,path)
                }
                if (newPath!==null){
                    shortest=[...newPath]
                }
            }
        }
        return shortest
    }
    const HandleSeeConnection=()=>{
        const selector1 = document.getElementById("Selection1")
        const selector2 = document.getElementById("Selection2")
        if (Object.keys(UsersList).includes(selector1.value)===false || Object.keys(UsersList).includes(selector2.value)===false){
            alert("Select both the fields Person 1 and Person 2")
        }
        else if(selector1.value===selector2.value){
            alert("Person 1 and Person 2 cannot be same")
        }
        else{
            const connect=DFS(selector1.value,selector2.value)
            const newCheck=[true,...connect]
            setCheck(newCheck)
        }
    }
    const HandleRevertHome = ()=>{
        setCheck([false])
        setConnections(false)
    }

    if (Check[0]===false){
        return (
            <div className="buttons-container">
                <div className="button-box">
                    <p className="heading">See how connected?</p>
                    <div className="selectionbox">
                        <label htmlFor="Selection1">Person 1 </label>
                        <select id="Selection1">
                            <option default value="-- select one --"> -- select one -- </option>
                            {Object.keys(UsersList).map(user=>(
                                <option value={user} placeholder="Select your friend">{user}</option>
                            ))}
                        </select>
                    </div>
                    <div className="selectionbox">
                        <label htmlFor="Selection2">Person 2 </label>
                        <select id="Selection2">
                            <option default value="-- select one --"> -- select one -- </option>
                            {Object.keys(UsersList).map(user=>(
                                <option value={user} placeholder="Select your friend">{user}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={HandleSeeConnection} className="buttons">see connection</button>
                    <button onClick={()=>setConnections(false)} className="buttons">Cancel</button>
                </div>
                <div className="button-box1">
                    <p>Six degrees of separation is the idea that all people are six or fewer social connections away from each other, Similarly to view how two persons are connected in our ABC community, select any two persons and hit see connection</p>
                </div>
            </div>
        )
    }
    else{
        const Person1 = document.getElementById("Selection1").value
        const Person2 = document.getElementById("Selection2").value
        var result=""
        for (var i=1;i<Check.length;i++){
            result=result+Check[i]+" => "
        }
        return (
            <div className="Joinedbox">
                <p>{Person1+" and "+Person2+" are connected as : "}</p>
                <p style={{color:'green',fontWeight:'bold'}}>{result.slice(0,-3)}</p>
                <button onClick={HandleRevertHome} className="Hbutton">Home</button>
            </div>
        )
    }
}
