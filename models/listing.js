const mongoose=require("mongoose");
const mongo_url='mongodb://127.0.0.1:27017/WanderLust';
const Schema=mongoose.Schema;

main()
.then((res)=>{
    console.log("DataBase connection is Scuccessfull");
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(mongo_url);
};

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:{type:String,
        default:"https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
        set:(v)=>{
            return v===""? "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069" : v
        }}
    },
    price:Number,
    location:String,
    country:String
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;
