const express = require("express");

const app =express();

const port = 8000;

app.get("/", (req,res)=>{
    return res.send("Home Page :) ");
});

app.get("/signout", (req,res)=>{
    return res.send("you are signed out :) ");
});

const Home=(req, res)=>{
    return res.send("this is Home");
}

const admin=(req, res)=>{
    return res.send("this is admin dashboard");
}
 app.use(Home);
const isAdmin=(req, res,next)=>{
    console.log("isAdmin is running");
    next();
}

const isLoggedIn=(req,res,next)=>{
    console.log("isLogged");
    next();
}
app.get("/admin",isLoggedIn, isAdmin, admin);

app.get("/hitesh", (req,res)=>{
    return res.send("hitesh uses instagram :) ");
});

app.get("/login", (req,res)=>{
    return res.send("you are visiting login route :) ");
});

app.get("/signup", (req,res)=>{
    return res.send("you are visiting signup route :) ");
});

app.listen(port, ()=>{
    console.log("Server is up and running...");
});


// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

