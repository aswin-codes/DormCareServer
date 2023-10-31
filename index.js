const express = require('express');
const bodyParser = require('body-parser');
const laundryRoutes = require('./laundry');
const cors = require('cors');
const server = express();
server.use(bodyParser.json())

server.use(cors({ origin: 'http://127.0.0.1:5173' })); 
server.use('/laundry',laundryRoutes);

server.get('/api/test',async(req,res ) => {
    res.send("Server is working");
})

server.listen(3000,() => {
    console.log("Express server is running at port 3000");
})