const express=require('express')
const app=express();
const server=require('http').createServer(app);
const {Server}=require('socket.io')
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const cors=require('cors')
require('./models/chat')
const CHATS=mongoose.model('CHATS')
dotenv.config();
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected',()=>{
  console.log('Connected to mongodb..')
})
mongoose.connection.on('error',()=>{
  console.log('Couldnt connect to mongodb..')
})
const io=new Server(server,{
  cors:{
    origin:'*'
  }
})
io.on('connection',(socket)=>{
    console.log('Connected to socket...',socket.id);
    socket.on('join',()=>{
      CHATS.find().then(response=>{
       socket.emit('join',response) 
      })
      .catch(err=>console.log(err))
    })
    socket.on('chat message',(payload)=>{
        // console.log('Payload...',payload);
        io.emit('chat message',payload);
        const chat=new CHATS({
          senderName:payload.userName,
          chatContent:payload.message
        })
        chat.save().then(res=>console.log('Chat saved to database....'))
    })
    socket.on('disconnect',()=>{
      console.log('Client left...')
    })
})
server.listen(5000||process.env.port,()=>{
    console.log('server is active...')
});