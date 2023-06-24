import './App.css';
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
function App() {
  const[chat,setChat]=useState([]);
  const[message,setMessage]=useState("");
  const[userName,setUserName]=useState("");
const socket=io.connect('http://localhost:5000/');
  const sendChat=(e)=>{
e.preventDefault();
if(message){
socket.emit('chat message',{message,userName});
setMessage('');
}
  }
  useEffect(()=>{
    
    socket.on('chat message',(payload)=>{
      setChat([...chat,payload]);
    })
  },[chat])
useEffect(()=>{
  return()=>{
setUserName(prompt('Enter your name?'))
console.log(userName)
  }
},[])
  return (
    <div className="App">
      <header className="App-header">
      <h1>My chat application</h1>
      {
        chat.map((payload,idx)=> 
        (
         <p key={idx}>{payload.userName}:{payload.message}</p>
        ))
      }
      <form onSubmit={sendChat}>
       <input type="text" name='text' value={message} onChange={(e)=>setMessage(e.target.value)}/>
       <button type='submit'>Send</button>
       </form>
      </header>
    </div>
  );
}

export default App;
