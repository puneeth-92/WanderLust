const mongoose=require("mongoose");
const mongo_url='mongodb://127.0.0.1:27017/WanderLust';
const Schema=mongoose.Schema;


const reviewSchema= new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports=mongoose.model("Review",reviewSchema);