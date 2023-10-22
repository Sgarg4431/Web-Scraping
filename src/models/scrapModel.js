const mongoose=require("mongoose");

// mongoose schema 
const schema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        required:true
    },
    data:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("scrapModel",schema);