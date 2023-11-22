const express=require("express"); // in clude axpress
const app=express(); 
app.use(express.urlencoded());    // encoded the body of the form that request this server
app.use(express.static("./"));    // to access the static files 

// middleware is a function that have  access to the request object and
// the response object and the next function
// middleware os run globaly in my file 
//  for example to log the request methon and the request url

app.use((req,res,next)=>{
    console.log(" method: ",req.method," Url:", req.url);
    next();   //run the next middleware 

})
// to use this middleware in a specific route write the specific rout befor the callback function

const mongo=require("mongodb");   // in clude mongo
// the url to connect the Db
const url="mongodb+srv://abdullah:abdo123@cluster0.3i71lxx.mongodb.net/?retryWrites=true&w=majority";
const client=new mongo.MongoClient(url); // in clude client of the mongo Db
 



 //function to connect the Db

//  async function return promise and can use await return to elzero web school
async function connectDb(){      
   await client.connect();
    const courses=  await client.db("courses").collection("courses");
    // const data= await courses.find({}).toArray();
    // console.log(data);
    return courses;

}


app.get("/courses",async(req,res)=>{
    try{

        const courses=await connectDb();
        const data=await courses.find().toArray();
        // const data=   courses.find();
        // console.log(data);
        res.status(200).json(data);
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
});
  

app.listen(8080,"127.0.0.4",()=>{
    console.log(" server is run and lisen at 808");

})