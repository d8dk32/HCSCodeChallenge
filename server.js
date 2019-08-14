const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";

var mongoDB = null;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoint used to log the user in
app.post('/login', (req,res) => {
    //this is not very secure authentication, simply matching to hardcoded passwords
    if(req.body.username === 'username' && req.body.password === 'password')
    {
        res.send({
            authenticated: true,
            username: req.body.username
        });
    }
    else {
        res.send({
            authenticated: false,
            username: ""
        });
    }
});

//retrieve user info based on username
app.get('/user/:username', (req, res) => {
    //get from mongo entries with that username
    const query = {username: req.params.username};
    mongoDB.collection("users").findOne(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//update user's task list
app.post('/updateTasks/:username', (req, res) => {
    //update task list for this user in mongo
    const query = {username: req.params.username};
    const updatedValues = { $set: req.body};
    mongoDB.collection("users").updateOne(query, updatedValues, (err, result) => {
        if (err) throw err;
        console.log("document for " + req.params.username + " updated." );
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//connect mongo client
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) throw err;
    console.log("Database created!");
    mongoDB = client.db("userInfo");
    //inserting into a nonexistent collection creates the collection
    const query = {username: "username"};
    mongoDB.collection("users").findOne(query, (err, result) => {
        if (err) throw err;
        if (!result) {
            //if the data does not already exist, load starter data
            mongoDB.collection("users").insertOne({
                username: "username",
                name: "John Smith",
                tasks: ["eat", "sleep"]
            }, (err, res) => {
                if (err) throw err;
                console.log("initial data loaded");
            });
        }
    });
  });

//start the server listening
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
