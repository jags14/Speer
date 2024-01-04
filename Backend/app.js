const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
dotenv.config();

var corsOptions = {
    origin: 'http://localhost:4000'
}

const app = express();

app.use(cors(corsOptions));
// parse requests of content-type: application/json
app.use(express.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(
    cookieSession({
        name: 'speer-session',
        keys: ['cookie_secret'],
        httpOnly: true
    })
)
app.get('/', (req, res) => {
    console.log(req);
    res.send("<h1>Hello world !</h1>")
})

// connecting to mongodb database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://speer:" + process.env.MONGODB_PASSWORD + "@cluster0.qlrwiez.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// listen to server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`);
});
