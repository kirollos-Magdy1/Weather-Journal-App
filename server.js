// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//require cors
const cors = require('cors')
app.use(cors());
// require body parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 3000 ;

app.get("/all",(req, res) => res.send(projectData));

//post route
app.post("/add", (req, res) => {
    projectData = req.body;
    console.log(projectData);
});



app.listen(port ,() => console.log(`server is running on port number: ${port}`));
