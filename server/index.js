const app=require('express')();
const server=require('http').createServer(app);
const io=require('socket.io')(server);
io.on('connection',(socket)=>{
    console.log('Connected to socket...',socket);
    socket.on('chat',(payload)=>{
        console.log('Payload...',payload);
        io.emit('chat',payload);
    })
})
server.listen(5000,()=>{
    console.log('server is active...')
});