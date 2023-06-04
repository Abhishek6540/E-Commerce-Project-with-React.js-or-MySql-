import React, {useState} from 'react'
import NoteContext from './NoteContext'

function NotState(props) {

    const [isLogin,setIsLogin] = useState(true);
    const [user, setUser] =useState("")
    // const [image, setImage] =useState("image")

    
  return (
    <NoteContext.Provider value={{isLogin,setIsLogin, user,setUser}}>
      {props.children}

    </NoteContext.Provider>
  )
}


export default NotState;