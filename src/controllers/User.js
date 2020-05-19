//jshint esversion:6
//'use strict';
const bcrypt = require("bcrypt");
const _ = require("lodash");
const con = require("../connection.js");
const passport = require('passport');
const model = require('../models/model.js');
const bookings = require('./Booking.js');

const Booking = bookings.Booking;


const booking = new Booking();


/**
 * user regeseration and login
 * works
 */
class User {
    
    async createUser(req, res) { // postman

        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, 10);
          var users={
            "email":""+req.body.email,
            "pw":encryptedPassword
            }
  
        con.query('INSERT INTO kunde SET ?',users, function (error, results, fields) {
        if (error) {
            res.send({
            "code":400,
            "failed":"error ocurred"
        })
        } else {
            res.send({
            "code":200,
            "success":"user registered sucessfully"
            });
        } 
        });
    }


    login(req, res) { // works
        var email= req.body.email;
  var password = req.body.password;
  con.query('SELECT * FROM kunde WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });

   }

   

   

    user(userId) {
        return model.User.findById(userId)
            .then(user => {
                    console.log(user);
                    return {
                        ...user._doc,
                        _id: user.id,
                        bookedFimls: booking.Events.bind(this, booking._doc.bookedFimls)
                    };
                }
            )
            .catch(err => {
                console.log(err);
            });
    }


    findUser(username) { // works2

        // console.log("type is" + typeof username);
        if (arguments.length === 0) {
            // .find()
            // no args passed, return all usernames in an object
            return model.User.find()
                .then(users => {
                    return users;
                    return users.map(user => {
                        return user;
                    });
                })
                .catch(err => console.log(err));
        } else if (typeof username === "string") {

            return model.User.find({email: username})
                .then(user => {
                    return user;
                }).catch(err => console.log(err));
        } else {
            // unsupported arguments passed
            console.log("Unsupported");
        }
    }

    findUserById(userId) { // workes2

        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            return model.User.findById(userId)
                .then(user => {
                    if (user) {
                        // return {...user._doc};
                        return user;
                    }
                })
                .catch(err => {
                    throw err;
                })

        } else {
            console.log("not a valid User-Id");
        }
    }
}

module.exports = {
    User: User
};