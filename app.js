
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


const connectdb = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectdb();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");
// app.set("views",path.resolve(--dirname,"views"));

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

//load routes
app.use('/',require('./server/routes/router'));


app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
