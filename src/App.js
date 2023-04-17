import './App.css';
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
function App() {
  const[chat,setChat]=useState([]);
  const[message,setMessage]=useState("");
const socket=io.connect('http://localhost:5000/');
  const sendChat=(e)=>{
e.preventDefault();
socket.emit('chat',{message});
setMessage('');
  }
  useEffect(()=>{
    socket.on('chat',(payload)=>{
      setChat([...chat,payload]);
    })
  })
  return (
    <div className="App">
      <header className="App-header">
      <h1>My chat application</h1>
      {
        chat.map((payload,idx)=> 
        {
        return <p key={idx}>{payload.message}</p>
      })
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
