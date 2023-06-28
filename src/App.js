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
  
socket.on('chat message',(payload)=>{
  console.log(payload)

})
socket.emit('join')
socket.on('join',(data)=>{

  console.log('socket data:',data)
  setChat(data)
})
  },[chat])
useEffect(()=>{

  return()=>{
    
setUserName(prompt('Enter your name?'))

  }
},[])
  return (
    <div className="App">
      <header className="App-header">
      <h1>My chat application</h1>
      <div className="chat_display">
      {
        chat?.map((payload,idx)=> 
        (
         <p key={idx}><b>{payload.senderName}</b>:{payload.chatContent}</p>
        ))
      }
      </div>
      <form onSubmit={
        sendChat
      }>
       <input type="text" name='text' value={message} onChange={(e)=>{setMessage(e.target.value)
      }}/>
       <button type='submit'>Send</button>
       </form>
      </header>
    </div>
  );
}

export default App;
