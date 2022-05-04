const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

//use middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER}:${process.env.USER_PASS}@cluster0.bd2wi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{

        await client.connect()
        const laptopCollection = client.db('hunter-laptop').collection('items')
      
        app.get('/laptops',async(req,res)=>{
           const query = {}
           const cursor = laptopCollection.find(query)
           const laptops =  await cursor.toArray()
           res.send(laptops)
        })

    }
    finally{

    }
}
run()





app.get('/', (req,res)=>{
    res.send('hello')
})

app.listen(port, () => {
    console.log('Listing to port', port);
})