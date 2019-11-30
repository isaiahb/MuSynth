// const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

cookieParser = require('cookie-parser');
bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 9001;
const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/", (req, res)=>{
	res.send("hello world");
});
app.use('/', express.static(__dirname + '/static'));


app.listen(PORT, function () {
	console.log("Server is running on Port: " + PORT);
	console.log("http://localhost:" + PORT);
});

