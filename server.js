const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// An api endpoint that returns a short list of items
app.post('/login', (req,res) => {
    //do mongo stuff eventually
    //for now just send something back
    if(req.body.username && req.body.password)
    {
        res.send({
            authenticated: true, 
            userInfo: {
                name: "John Smith",
                tasks: ["eat", "sleep"]
            }
        });
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
