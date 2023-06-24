const app=require('express')();
const server=require('http').createServer(app);
const {Server}=require('socket.io')
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