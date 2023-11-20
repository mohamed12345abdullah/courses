const express=require("express");
const app=express();
app.use(express.urlencoded());

const mongo=require("mongodb");
const url="mongodb+srv://abdullah:abdo123@cluster0.3i71lxx.mongodb.net/?retryWrites=true&w=majority";
const client=new mongo.MongoClient(url);



app.listen(8080,()=>{
    console.log(" server is run and lisen at 8080");

})

async function connectDb(){
   await client.connect();
    const courses=  await client.db("courses").collection("courses");
    // const data= await courses.find({}).toArray();
    // console.log(data);
    return courses;

}

connectDb();
app.get("/courses",async(req,res)=>{
    try{

        const courses=await connectDb();
        const data=await courses.find().toArray();
        // const data=   courses.find();
        // console.log(data);
        res.json(data);
        // res.end(" done");
    }
    catch(e){console.log(e);}

})


app.post("/add",async(req,res)=>{

    console.log(" post course is run ");
    const courses= await connectDb();
     await courses.insertOne(req.body);

    // console.log(typeof(req.body));
    res.end(" sucsess add   ");

})



app.post("/del",async(req,res)=>{
    const title=req.body.title;
    const courses= await connectDb();
    await courses.deleteOne({title:title});
    res.end("done");

})


   
app.post("/replace",async(req,res)=>{
    const title = req.body.title;
    const courses= await connectDb();
    await courses.findOneAndReplace({title:title}, req.body )
res.end("done")
})
 