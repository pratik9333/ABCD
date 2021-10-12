require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");

//MyRoutes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");
//DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// const  log = (request,response,next) =>{
//     try{
//     throw new Error("Bye");
//     console.log('logged');
//     }
//     catch(err){
//     next();
//     }
// }
// const  log2 = (request,response,next) =>{
//     console.log('logged 2');
//     next();
// }

// use middleware globally
// app.use(log);

//use for particular route
// app.get("/hello",[log,log2],(request,response)=>{

//     response.send("HELLO LOGGED");
// })

// Middle Wares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

const port = process.env.PORT || 8000; // PORT

//STARTING SERVER
app.listen(port, () => {
  console.log(`app is runnning at ${port}`);
});
