const express = require('express');
const cors= require('cors');
const app= express();
var bodyparser=require('body-parser');
const router=express.Router();



app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());

const PORT = process.env.PORT ||3001;



app.use(require('./approuter'));

app.listen(PORT,()=>{
    console.log('SERVER IS RUNNING ON PORT : ', PORT);
})