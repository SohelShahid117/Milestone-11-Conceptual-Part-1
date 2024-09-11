const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const corsOptions = {
  origin: ["http://localhost:5174/","http://localhost:5173/"],
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
require("dotenv").config()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
  console.log(`Example app listening on port ${port}`)
})