import React,{useState} from 'react'
import './startPage.css'
import { JoinPage } from './JoinPage'
import {ConnectionsPage} from './ConnectionsPage'

export const UsersContext=React.createContext()
export const StartPage = () => {
    const dummyData={
        "rahul":["sai","charan"],
        "sai":["kiran","dhruv","rahul"],
        "kiran":["sai"],
        "dhruv":["sai"],
        "charan":["rahul"]
    }
    if (sessionStorage.getItem("UsersList")===null){
        sessionStorage.setItem("UsersList",JSON.stringify(dummyData))
    }
    const IntialUsersList = JSON.parse(sessionStorage.getItem("UsersList"))
    const [UsersList,setUsersList] = useState(IntialUsersList)
    const [Join, setJoin] = useState(false)
    const [connections, setConnections] = useState(false)
    const Joinclick=()=>{
        setJoin(true)
    }
    const ConnectionsClick=()=>{
        setConnections(true)
    }
    const Display = ()=>{
        if (Join===false && connections===false){
            return(
                <div className="buttons-container">
                    <div className="button-box">
                        <p className="heading">Join</p>
                        <p>You can join in ABC community only if you already have a friend in our community by cicking Join button below</p>
                        <button onClick={Joinclick} className="buttons">Join</button>
                    </div>
                    <div className="button-box">
                        <p className="heading">See how connected?</p>
                        <p>Six degrees of separation is the idea that all people are six or fewer social connections away from each other, Similarly to view how to persons are connected in our ABC community, hit see connections button</p>
                        <button onClick={ConnectionsClick} className="buttons">see connections</button>
                    </div>
                </div>)
            }
        else if (Join===true && connections===false){
            return <JoinPage setJoin={setJoin}></JoinPage>
        }
        else{
            return <ConnectionsPage setConnections={setConnections}></ConnectionsPage>
        }
    }
    return (
        <UsersContext.Provider value={[UsersList,setUsersList]}>
            <div className="Main-container">
                <div className="Introduction-container">
                    <p className="Mheading">Welcome to ABC community <br/> This is a platform for connecting friends.</p>
                    {Display()}
                </div>
                <img className="image" src="images/startPage1.jpg" alt="LOGO"/>
            </div>
        </UsersContext.Provider>
    )
}
