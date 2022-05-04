const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        
        // get all item api
        app.get('/laptops',async(req,res)=>{
           const query = {}
           const cursor = laptopCollection.find(query)
           const laptops =  await cursor.toArray()
           res.send(laptops)
        })
        // get single item api
        app.get('/laptops/:id',async (req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const laptop = await laptopCollection.findOne(query)
            res.send(laptop)

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