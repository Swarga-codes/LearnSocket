const express=require('express')
const app=express();
const server=require('http').createServer(app);
const {Server}=require('socket.io')
const dotenv=require('dotenv');
const mongoose=require('mongoose')
dotenv.config();
app.use(express.json())
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
    console.log('Connected to socket...');
    socket.on('chat message',(payload)=>{
        // console.log('Payload...',payload);
        io.emit('chat message',payload);
    })
    socket.on('disconnect',()=>{
      console.log('Client left...')
    })
})
server.listen(5000,()=>{
    console.log('server is active...')
});