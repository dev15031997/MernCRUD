const express=require('express')
const router=require('./Routes/auth')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app=express()
require('./DB/conn')
const port=process.env.PORT 

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin:true, credentials:true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(router);

app.listen(port,()=>{
    console.log('server working at port '+ port);
})