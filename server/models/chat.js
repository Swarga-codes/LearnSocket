const mongoose=require('mongoose')
const chatSchema=new mongoose.Schema({
    senderName:{
        type:String,
        required:true
    },
    chatContent:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
mongoose.model("CHATS",chatSchema)