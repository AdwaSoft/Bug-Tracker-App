import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from   './db/config';

import bugRouter from './routes/bugRouter'



const app = express();
const port = 4000;


app.use('/public',express.static(path.join(__dirname,'public')))

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use('/bugs',bugRouter)

app.get("/",(req,res)=>{
    res.send("Bug Trucker App")
})

app.listen(port,(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(`SErver Running On Port ${port}`)
    }
})