import './App.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {useState, useEffect, useRef} from 'react'


export function Memories(props) {
  return (
    <div style={{height: '42rem', padding: 20, display: 'flex'}}>
      <div style={{display: 'flex',flex: 1, backgroundColor: '#131a54', borderRadius: 25, margin: 5, alignItems: 'center', flexDirection: 'column'}}>
        <div style={{marginTop: '2rem'}}>
          <FaRegCircleUser onClick={() => props.setChatPage(true)}color='white' size={30} />
        </div>
        <div style={{marginTop: '2rem'}}>
          <IoSparkles  color='white' size={30} />
        </div>
        <div style={{marginTop: '2rem'}}>
          <FiLogOut onClick={() => props.setUsername(undefined)} color='white' size={30} />
        </div>
      </div>
      <div style={{flex: 14, backgroundColor: 'grey'}}>

      </div>
    </div>
    
  )
}
export function Portal(props) {
  const [chatPage, setChatPage] = useState(true)
  return (
    <div>
      {chatPage? <ChatPage setUsername={props.setUsername} setChatPage={setChatPage} userName={props.userName}/> : <Memories setChatPage={setChatPage} setUsername={props.setUsername}/>}
    </div>
    
  )
}

export function Login(props) {

  const username = useRef('')
  const password = useRef('')
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
    width: '100vw'}}>
      <h1>I N S E R T   N A M E</h1>
      <input style={{backgroundColor: '#dbdbdb', borderRadius: 10, borderStyle: 'none', margin: '0.5rem', padding: 10}} onChange={(e) => username.current = e.target.value} placeholder='username...'/>
      <input style={{backgroundColor: '#dbdbdb', borderRadius: 10, borderStyle: 'none', margin: '0.5rem', padding: 10}} onChange={(e) => password.current = e.target.value} type='password' placeholder='password...'/>
      <button style={{backgroundColor: '#dbdbdb', borderRadius: 10, borderStyle: 'none', margin: '0.5rem', padding: 10}} onClick={() => props.setUsername(username.current)}>Login</button>
    </div>
  )
}

export function App() {
  const [userName, setUsername] = useState()
  return (
   <div>
    {userName==undefined? <Login setUsername={setUsername}/> : <Portal userName={userName} setUsername={setUsername}/>}
   </div>
  )
}

export function ChatPage(props) {

  const [chatPreview, setChatPreview] = useState([["jhon", "dude I have some crazy news"], ["cindy", 'i think its time for a break']])
  const [currentChat, setCurrentChat] = useState([["user1", "hello"], ["jhon", "hi"], ["user1", "my days been shit"]])
  const currentMessage = useRef()

  const UpdateMessages = () => {
    const updatedChat = [... currentChat, [props.userName, currentMessage.current]]
    setCurrentChat(updatedChat)
    console.log(props.userName)
  }

  const changeCurrentChat = (user) => {

  }
  return (
    <div className='panel'>
      <div className='subpanel-1'>
        <div className='icon'>
          <FaRegCircleUser color='white' size={30} />
        </div>
        <div className='icon'>
          <IoSparkles onClick={() => props.setChatPage(false)} color='white' size={30} />
        </div>
        <div className='icon'>
          <FiLogOut onClick={() => props.setUsername(undefined)} color='white' size={30} />
        </div>
      </div>

      <div className='subpanel-2'>
        <input className="input-1" placeholder='search' type='text'/>
        {chatPreview.map((data) => (
        <div style={{backgroundColor: '#f2f2f2', width: '100%', borderRadius: 10, padding: 5, height: '5rem', margin: '1rem', display: 'flex'}} onClick={() => changeCurrentChat(data[0])}>
          <div style={{flex: 3, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <FaRegCircleUser flex={4} color='grey' size={40} />
            </div>
            <div style={{flex: 6, margin: 15}}>
              <p style={{ margin: 0, fontSize: 12}}><strong>{data[0]}:</strong></p>
              <p style={{ margin: 0, fontSize: 12}}>{data[1]}</p>
            </div>
        </div>
      ))}
      </div>
      <div className='subpanel-3'>
        <div style={{display: 'flex', flexDirection: 'flex-end', alignItems: 'center', backgroundColor: '#f2f2f2', borderTopLeftRadius: 15, borderTopRightRadius: 15, height: '5rem' }}>
            <div style={{marginLeft: 15}}><FaRegCircleUser padding={10} size={30}/></div>
            <p style={{marginLeft: '1rem'}}>{props.userName}</p>
        </div>
         <div className='message-panel'>
          {currentChat.map((data) =>  (
            <div style={{alignSelf: data[0] == props.userName? 'flex-end' : 'flex-start', backgroundColor: data[0] == props.userName? '#6899ed' : '#f2f2f2', borderRadius: 10, margin: '0.5rem'}}>
              <p style={{margin: '0.5rem'}}>{data[1]}</p>
            </div>
          ))}
         </div>
         <div className='message-controls'>
            <input onChange={e => currentMessage.current = e.target.value} placeholder='message...'/>
            <button onClick={() => UpdateMessages()}>send</button>
         </div>
      </div>
    </div>
  )
}


export default App





