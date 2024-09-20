const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

const corsOptions = {
  origin: ["http://localhost:5174","http://localhost:5173"],
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
require("dotenv").config()

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

    //get all jobs data from mongoDB
    app.get("/allJobs",async(req,res)=>{
      const result = await jobsCollection.find().toArray()
      // console.log(result)
      res.send(result)
    })

    //get all posted jobs specific by email 
    app.get("/jobs/:email",async(req,res)=>{
      const email = req.params.email
      const query = {buyer_email:email}
      const result = await jobsCollection.find(query).toArray()
      // console.log(result)
      res.send(result)
    })

     //get single job data from mongoDB
     app.get("/jobDetails/:id",async(req,res)=>{
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
    app.get("/myBidJobs/:email",async(req,res)=>{
      const email = req.params.email
      const query = {bidderEmail:email}
      const result = await bidsCollection.find(query).toArray()
      // console.log(result)
      res.send(result)
    })

    //get all requested job to buyer by buyer email
    app.get("/buyerBidRequestJob/:email",async(req,res)=>{
      const email = req.params.email
      const query = {buyer_email:email}
      const result = await bidsCollection.find(query).toArray()
      // console.log(result)
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