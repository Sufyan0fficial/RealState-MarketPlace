const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DBConnection = require("./db/connect");
dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STR;
const UserAuth = require('./Routes/auth');
const ErrorHandler = require("./Middlewares/errorHandler");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const User = require('./Routes/user')
const Listing = require('./Routes/listing')
const path = require('path')


app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',UserAuth)
app.use('/api/user',User)
app.use('/api/listing',Listing)
app.use(ErrorHandler)





const AppStarter = async () => {
  try {
    await DBConnection(connectionString);
    console.log('DB connection successfully established')
    app.listen(3000,()=>{
        console.log('app started at port 3000')
    })
  } catch (error) {
    console.log('there caught an error while starting the app',error)
  }
};

AppStarter()
