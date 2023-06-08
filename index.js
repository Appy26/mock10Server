const express = require('express');
const userRoute = require('./Routes/user.routes');
const cors = require('cors');
const { connection } = require("./config/db");
const authenticate = require('./middlewares/authenticate');

const app = express();
app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use(authenticate)
app.listen(process.env.port, async() => {
  try {
      await connection
      console.log("server is running")
  } catch (error) {
    res.send({msg:"error.message"})
  }
})