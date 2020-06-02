//jshint esversion:6
//'use strict';
const bcrypt = require("bcrypt");
const _ = require("lodash");
const con = require("../connection.js");


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
        try{
        var email= req.body.username;
        console.log(email);
  var password = req.body.passwordLog;
  con.query('SELECT * FROM kunde WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
        
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].pw)
        if(comparision){
            req.session.loggedin = true;
            req.session.username = email;
            req.session.kid = results[0].kid;
            console.log(results[0].kid +" und " + req.session.kid);
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
    }catch(err) {
        next(err);
    }

   }

   

   
}
    

module.exports = {
    User: User
};