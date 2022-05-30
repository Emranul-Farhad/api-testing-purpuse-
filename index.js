const express = require('express')
const app = express()
const port =  process.env.PORT || 8000
var cors = require('cors')
require('dotenv').config()





// midel ware
app.use(cors())
app.use(express.json());



// mongo cluster

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.KEY}:${process.env.PASS}@cluster0.23da0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("mongo connect");
//   client.close();
// });




async function run() {

    try{

        await client.connect()
        const collection = client.db("practice").collection("set");

    //   get
    app.get('/all' , async(req,res)=> {
        const getall = await collection.find().toArray()
        res.send(getall)
    } )

    app.post('/post' , async(req,res)=> {
        const posttest = req.body ;
        const setstore = await collection.insertOne(posttest)
        res.send(setstore)
    } )


    // update method id wide
     app.put("/update/:id", async(req,res)=> {
        //  const get = req.body ;
         const id = req.params.id
         const filter =  {_id : ObjectId(id) }
         console.log(filter);
         const options = { upsert: true };
         const updateDoc = {
            $set: {
                name : req.body.name ,
                location : req.body.location,
                education : req.body.education
             },
          };
          const success = await collection.updateOne(filter, updateDoc, options)
      
          res.send(success)
     } )
  


     






    



        
        




    }
  finally{

  }

}

run().catch(console.dir);



// express ap hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})