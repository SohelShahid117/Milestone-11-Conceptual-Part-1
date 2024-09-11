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


const { MongoClient, ServerApiVersion } = require('mongodb');
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