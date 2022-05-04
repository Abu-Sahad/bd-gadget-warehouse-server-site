const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());







app.get('/', (req,res)=>{
    res.send('hello')
})

app.listen(port, () => {
    console.log('Listing to port', port);
})