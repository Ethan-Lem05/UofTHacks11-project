import './App.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {useState, useEffect, useRef} from 'react'
import firebase from 'firebase/app';
import { collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy } from 'firebase/firestore'

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



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

  const [chatPreview, setChatPreview] = useState()
  const [currentChat, setCurrentChat] = useState()
  const currentMessage = useRef()

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room==messages"),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.forEach((doc) => {
        setCurrentChat(prev=> [...prev, doc.data() ]);
      });
    });

    return () => unsuscribe();
  }, []);


  const UpdateMessages = async (event) => {
    //const updatedChat = [... currentChat, [props.userName, currentMessage.current]]
    //setCurrentChat(updatedChat)
    //console.log(props.userName)
    event.preventDefault();

    const messagesRef = collection(db, "messages")
    await addDoc(messagesRef, {
      text: currentMessage.current,
      createdAt: serverTimestamp(),
      user: props.userName,
      room: 'messages',
    });

    currentMessage.current = "";
  }

  const changeCurrentChat = (user) => {

  }
  return (
    <div style={{height: '42rem', padding: 20, display: 'flex'}}>
      <div style={{display: 'flex',flex: 1, backgroundColor: '#131a54', borderRadius: 25, margin: 5, alignItems: 'center', flexDirection: 'column'}}>
        <div style={{marginTop: '2rem'}}>
          <FaRegCircleUser color='white' size={30} />
        </div>
        <div style={{marginTop: '2rem'}}>
          <IoSparkles onClick={() => props.setChatPage(false)} color='white' size={30} />
        </div>
        <div style={{marginTop: '2rem'}}>
          <FiLogOut onClick={() => props.setUsername(undefined)} color='white' size={30} />
        </div>
      </div>

      <div style={{flex: 3, backgroundColor: '#dbdbdb', borderRadius: 25, 
                  margin: 5, display: 'flex', alignItems: 'center', 
                  flexDirection: 'column'}}>
        <input style={{marginTop: '2rem', backgroundColor: 'transparent', padding: 5, borderRadius: 10, borderStyle: 'solid'}} placeholder='search' type='text'/>
        {chatPreview.map((data) => (
        <div onClick={() => changeCurrentChat(data[0])} style={{backgroundColor: '#f2f2f2', width: '12rem', borderRadius: 10, padding: 5, height: '5rem', margin: '1rem'}}>
          <p style={{ margin: 0 }}><strong>{data[0]}:</strong></p>
          <p style={{ margin: 0 }}>{data[1]}</p>
        </div>
      ))}
      </div>

      <div style={{height: '100%', flex: 12, backgroundColor: '#dbdbdb', borderRadius: 25, margin: 5, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', overflowY: 'scroll'}}>
         <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
          {currentChat.map((data) =>  (
            <div style={{alignSelf: data.sender == props.userName? 'flex-end' : 'flex-start', backgroundColor: data[0] == props.userName? '#6899ed' : '#f2f2f2', borderRadius: 10, margin: '0.5rem'}}>
              <p style={{margin: '0.5rem'}}>{data.text}</p>
            </div>
          ))}
         </div>
         <div style={{display: 'flex', justifyContent: 'center'}}>
            <input onChange={e => currentMessage.current = e.target.value} style={{width: '55rem', backgroundColor: '#f2f2f2', padding: 10, borderRadius: 10, borderStyle: 'none', margin: '1rem'}} placeholder='message...'/>
            <button onClick={(e) => UpdateMessages(e)} style={{color: 'white', width: '4rem', backgroundColor: '#6899ed', padding: 10, borderRadius: 10, borderStyle: 'none', margin: '1rem'}}>send</button>
         </div>
      </div>
    </div>
  )
}


export default App





