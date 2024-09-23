const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");  //use for token cookie
// const crypto = require('crypto');


const corsOptions = {
  origin: ["http://localhost:5174","http://localhost:5173"],
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());          //use for token cookie
require("dotenv").config()

//verify JWT middleware

const verifyToken = (req,res,next)=>{
  console.log("ami akjon middle man")
  const token = req?.cookies?.tokennn
  console.log("token t holo : ",token)
    if(!token) return res.status(401).send({message:"akane ascho keno ? tomi unAuthorized person.Ber how akn"})
    if(token){
        jwt.verify(token,process.env.access_token_jwt,(err,decode)=>{
          if(err){
            console.log(err)
            return res.status(403).send({message:"Bhol token anecho"})
          }
          console.log(decode);
          req.user = decode
          next();
        })
      }
}

//JS_Tech
//bNNnB6m7sIPG2RlC

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const jobsCollection = client.db("JS_Tech_Job_Categories").collection("Job_Categories")
    const bidsCollection = client.db("JS_Tech_Job_Categories").collection("bids")

    //generate JWT-->JSON Web Token
    app.post("/jwt",async(req,res)=>{
      const userEmail = req.body
      console.log(userEmail)
      const token =  jwt.sign(userEmail,process.env.access_token_jwt,{expiresIn:'365d'})
      console.log(token)
      // res.send({token})
      res.cookie("tokennn",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?"none":"strict"
      }).send({success:true})
    })

    //clear Token at logout
    app.get("/logout",(req,res)=>{
      res.clearCookie("tokennn",{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?"none":"strict",
        maxAge:0,
      }).send({success:true})

    })

    //get all jobs data from mongoDB
    app.get("/allJobs",async(req,res)=>{
      const result = await jobsCollection.find().toArray()
      // console.log(result)
      res.send(result)
    })

    //get all posted jobs specific by email 
    app.get("/jobs/:email",verifyToken,async(req,res)=>{
      
      // const token = req.cookies?.tokennn
      // console.log(token,"from jobs API")
      // if(token){
      //   jwt.verify(token,process.env.access_token_jwt,(err,decode)=>{
      //     if(err){
      //       console.log(err,"is err")
      //     }
      //       console.log(decode,"it is decode")
      //       // let tokenEmail = decode?.email
      //   })
      // }

      const tokenEmail = req.user?.email;
      console.log(tokenEmail,"token email from job API")
      const email = req.params.email
      if(tokenEmail !==email) return res.status(403).send({message:"Forbidden access"});
      const query = {buyer_email:email}
      const result = await jobsCollection.find(query).toArray()
      // console.log(result)
      res.send(result)
    })

     //get single job data from mongoDB
     app.get("/jobDetails/:id",verifyToken,async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    //post job by buyer
    app.post("/job",async(req,res)=>{
      const jobData = req.body
      const result = await jobsCollection.insertOne(jobData)
      res.send(result)
    })
    
    //delete a job
    app.delete("/jobs/:id",async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await jobsCollection.deleteOne(query)
      // console.log(result)
      res.send(result)
    })

    //post job by bidder
    app.post("/bid",async(req,res)=>{
      const bidData = req.body
      const result = await bidsCollection.insertOne(bidData)
      res.send(result)
    })

    //update posted job
    app.put("/updateJob/:id",async(req,res)=>{
      const id = req.params.id;
      const updateJbData = req.body
      console.log(updateJbData)
      const query = {_id : new ObjectId(id)}
      const options = {upsert : true}
      const updateDoc = {
        $set : {
          ...updateJbData
        }
      }
      const result = await jobsCollection.updateOne(query,updateDoc,options)
      res.send(result)
    })

    //my bids job collection
    //get all bidder applied jobs specific by bidder email 
    app.get("/myBidJobs/:email",verifyToken,async(req,res)=>{
      const email = req.params.email
      const query = {bidderEmail:email}
      const result = await bidsCollection.find(query).toArray()
      // console.log(result)
      res.send(result)
    })

    //get all requested job to buyer by buyer email
    app.get("/buyerBidRequestJob/:email",verifyToken,async(req,res)=>{
      const email = req.params.email
      const query = {buyer_email:email}
      const result = await bidsCollection.find(query).toArray()
      // console.log(result)
      res.send(result)
    })

    //update bid status by buyer
    app.patch("/updateBidStatus/:id",async(req,res)=>{
      const id = req.params.id;
      const status = req.body;
      console.log(status)
      const query = {_id : new ObjectId(id)}
      // const options = {upsert : true}
      const updateDoc = {
        $set : status,
      }
      // const result = await bidsCollection.updateOne(query,updateDoc,options)
      const result = await bidsCollection.updateOne(query,updateDoc)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
  console.log(`Example app listening on port ${port}`)
})

