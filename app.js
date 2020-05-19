//jshint esversion:6
require('dotenv').config();
var mysql = require('mysql');
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require("morgan");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require('cookie-parser');
const paypal = require("paypal-rest-sdk");
const MongoStore = require('connect-mongo')(session);
//const isAuth = require("./src/middleware/is-auth");
const {User} = require('./src/models/model');
const routes = require('./src/routes/routes');



const PORT = process.env.PORT||3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(isAuth);
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


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bikeworld"
  });

  con.connect(function(err) {
    if (err) throw err;
});




app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


/*app.use( (req, res, next) =>{
      res.locals.login = req.isAuthenticated();
       res.locals.session =req.session;
       next();
}); */

routes.routes(app);
app.use(morgan("dev"));
app.listen(PORT, () => console.log("Server started on port 3000"));




