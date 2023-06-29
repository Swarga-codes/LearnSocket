import './App.css';
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
const socket=io.connect('http://localhost:5000/');
function App() {
  const[chat,setChat]=useState([]);
  const[message,setMessage]=useState("");
  const[userName,setUserName]=useState("");
  const sendChat=(e)=>{
e.preventDefault();
if(message){
socket.emit('chat message',{message,userName});


setMessage('');

}
  }
  useEffect(()=>{

socket.emit('join')
socket.on('join',(data)=>{
  setChat(data)
})

  },[sendChat])
useEffect(()=>{

  return()=>{
    
setUserName(prompt('Enter your name?'))

  }
},[])
localStorage.setItem('name',userName)
  return (
    <div className="App">
     <div className="chatapp">
    <div className="heading">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
<h1>Chat App</h1>
   
    </div>
      <div className="chat_display">
      {
        chat?.map((payload,idx)=> 
        (
          <div className='chat'>
         <p key={idx}><b>{payload.senderName}</b></p>
         <div className="chat_content">
         {payload.chatContent}
         </div>
         </div>

        ))
      }
      </div>
      </div>
      <form onSubmit={
        sendChat
      }>
       <input type="text" name='text' value={message} onChange={(e)=>{setMessage(e.target.value)
      }}/>
       <button type='submit'>Send</button>
       </form>
      
    </div>
  );
}

export default App;
