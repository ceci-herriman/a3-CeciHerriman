require('dotenv').config();
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      session = require( 'express-session')
      app = express()

app.use( express.json() )
app.use( express.urlencoded({ extended:true }) )

// app.use( cookie({
//   name: 'session',
//   keys: ['btftufuf', 'ihohggugu']
// }))

app.use(session({
  secret: 'wwewewe',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

app.use(express.static('public'));

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

app.use( function( req,res,next) {
  const allowedPaths = ['/login'];

  if( allowedPaths.includes(req.path) || req.session.login === true ) {
    next()
  }
  else {
    res.sendFile( __dirname + '/public/index.html' )
  }
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null
let userCollection = null

async function run() {
  const dbName = 'a3-webware';

  try {
    await client.connect(
    err => {
      console.log("err :", err);
      client.close();
    }

    );  

    // Send a ping to confirm a successful connection
    await client.db("a3-webware").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db(dbName);
    collection = db.collection('documents');
    userCollection = db.collection('users');

    // await collection.insertOne( { name: 'Superman', year: 2025, plotRating: 9, actingRating: 9, musicRating: 10, overallRating: 9.33} )
    // await collection.insertOne( { name: 'Little Women', year: 2019, plotRating: 9, actingRating: 9, musicRating: 10, overallRating: 9.33} )
    // await collection.insertOne( { name: 'Knives Out', year: 2019, plotRating: 9, actingRating: 9, musicRating: 10, overallRating: 9.33} )

 } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

app.post('/login', async (req, res) => {
  const username = req.body.username;
  console.log(req.body)
  //get username and pass stored in DB from given username 
  const result = await userCollection.find({username}).toArray();
  const user = result[0]

  if ( user && req.body.password === user.password) {
    req.session.login = true;
    req.session.userId = user._id.toString();
    req.session.username = req.body.username;
    res.redirect( 'main.html' );
  }
  else if (!user && req.body.password !== null && req.body.username !== null && req.body.doCreateUser) {
    try {
      //create user in DB
      const newUser = { username: req.body.username, password: req.body.password}
      const result = await userCollection.insertOne( newUser )

      req.session.login = true;
      req.session.userId = result.insertedId.toString();
      req.session.username = req.body.username;
      req.session.isNewUser = true;
      res.redirect( 'main.html' );
    }
    catch (e) {
      console.log(e)
      res.redirect( '/index.html?error=serverError' );
    }
  }
  else {
     res.redirect( '/index.html?error=incorrectCreds' );
  }
})

app.get('/userDetails', (req, res) => {
  if (req.session.login) {
    
    const details = {
      username: req.session.username,
      isNewUser: req.session.isNewUser || false
    }

    console.log("session: ", details)

    res.json(details)
  }
  else {
    res.status(401).json({ error: 'Not logged in' })
  }
})

app.get('/results', async (req, res) => {
  //check if session has a user id 
  if (req.session.userId === null) {
    return res.status(401).send('Not authorized');
  }

  if (collection !== null) {
    const findResult = await collection.find({
      userId: req.session.userId
    }).toArray();

    res.json(findResult)
  }
})

app.post( '/add', async (req,res) => {
  //check if session has a user id 
  if (req.session.userId === null) {
    return res.status(401).send('Not authorized');
  }

  req.body = addDerivedField(req.body)
  req.body.userId = req.session.userId
  console.log("req body:", req.body)

  const result = await collection.insertOne( req.body )
    
  res.json( result )
})

app.post( '/remove', async (req,res) => {
  console.log("req body:", req.body)

  //check if session has a user id 
  if (req.session.userId === null) {
    return res.status(401).send('Not authorized');
  }

  const result = await collection.deleteOne({ 
      _id:new ObjectId( req.body._id ),
      userId: req.session.userId 
  })
  
  res.json( result )
})

app.post( '/update', async (req,res) => {
  console.log("req body:", req.body)

  //check if session has a user id 
  if (req.session.userId === null) {
    return res.status(401).send('Not authorized');
  }

  const total = req.body.plotRating + req.body.actingRating + req.body.musicRating
  const overallRating = Math.round((total / 3) * 100) / 100

  const result = await collection.updateOne(
        { _id: new ObjectId( req.body._id ), userId: req.session.userId },
        { $set:{ plotRating: req.body.plotRating, actingRating: req.body.actingRating, musicRating: req.body.musicRating, overallRating: overallRating} }
  )

  res.json( result )
})

run().catch(console.dir)

app.listen( process.env.PORT || 3000)

const addDerivedField = function( data ) {
  let total = data["plotRating"] + data["actingRating"] + data["musicRating"]

  let newObject = { 
      name: data["name"], 
      year: data["year"], 
      plotRating: data["plotRating"], 
      actingRating: data["actingRating"], 
      musicRating: data["musicRating"], 
      overallRating: Math.round((total / 3) * 100) / 100}

  return newObject
}

