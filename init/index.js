const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const mongo_url='mongodb://127.0.0.1:27017/WanderLust';
main()
.then((res)=>{
    console.log("DataBase connection is Scuccessfull");
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'691b091039377cfd3a0de61e'}));
    await Listing.insertMany(initdata.data);
    console.log("data initilized");
};

initDB();