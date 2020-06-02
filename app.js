
require('dotenv').config();
var mysql = require('mysql');
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/routes');


const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", " Content-Type, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200);
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

routes.routes(app);
app.use(morgan("dev"));
app.listen(PORT, () => console.log("Server started on port 3000"));