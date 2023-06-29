import './App.css';
import { useEffect,useRef,useState } from 'react';
import { io } from 'socket.io-client';
const socket=io.connect('https://learn-socket-backend.onrender.com/');
function App() {
  const[chat,setChat]=useState([]);
  const[message,setMessage]=useState("");
  const[userName,setUserName]=useState("");
  const chatsDisp=useRef()
  const formatter=(dateString)=>{
    // const dateString = "2023-06-29T16:36:53.997Z";
    const date = new Date(dateString);
    
    // Convert to a specific date and time format
    const formattedDate = date.toLocaleDateString('en-US');
    const formattedTime = date.toLocaleTimeString('en-US');
    return formattedDate+" at "+formattedTime

  }
  const sendChat=(e)=>{
e.preventDefault();
if(message){
socket.emit('chat message',{message,userName});


setMessage('');

}
  }

  useEffect(()=>{
    socket.on('chat message',(payload)=>{
      // console.log(payload)
    })
    socket.emit('join')
    socket.on('join',(data)=>{
      setChat(data)
    })

  },[chat])
useEffect(()=>{
  chatsDisp.current.scrollTop=chatsDisp.current.scrollHeight
  return()=>{
    
setUserName(prompt('Enter your name?'))

  }
},[])
// localStorage.setItem('name',userName)
  return (
    <div className="App">
     <div className="chatapp">
    <div className="heading">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
<h1>Chat App</h1>
   
    </div>
      <div className="chat_display" ref={chatsDisp}>
      {
        chat?.map((payload,idx)=> 
        (
          <div className='chat'>
         <p key={idx}><b>{payload.senderName}</b></p>
         <div className="chat_content">
         {payload.chatContent}
         </div>
         <p className='delivery'>Delivered on {formatter(payload.createdAt)}</p>
         </div>

        ))
      }
      </div>
      
      <form onSubmit={
        sendChat
      }>
       <input className="chat_text" type="text" name='text' value={message} onChange={(e)=>{setMessage(e.target.value)
      }} placeholder='Enter your message...'/>
       <button type='submit' className='sendBtn'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
     </svg>
     </button>
       </form>
       </div>
    </div>
  );
}

export default App;
