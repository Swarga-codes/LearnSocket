const express=require('express')
const app=express();
const PORT=process.env.PORT || 3000;
const http=require('http')
const server=http.createServer(app)
const {Server}= require('socket.io')
const io=new Server(server)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")

})
io.on('connection',(socket)=>{
    console.log('a user connected')
    // socket.broadcast.emit('hi')
    socket.on('chat message',(message)=>{
        io.emit('chat message',message)
    })
    socket.on('disconnect',()=>{
        console.log('user left..')
    })
})
server.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})