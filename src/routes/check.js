var con = require('../connection');
module.exports.routes = (app) => {

    app.get("/check", (req, res) => {

        console.log(req.session.kid);

        selectquery = "INSERT INTO rechnung (datum,uhrzeit,kid) VALUES (CURDATE(),CURTIME(), "+req.session.kid+")"; //3 aus logged in

        con.query(selectquery, function (err, result, fields) {
        if (err) throw err; })


        selectquery = "SELECT * FROM rechnung WHERE kid="+req.session.kid+" ORDER BY rid DESC LIMIT 1;"; //3 aus logged in

        var result1 = [];
        var  getInformationFromDB = function(callback) {

        con.query(selectquery, function(err, res, fields)
        {
            if (err)  return callback(err);
                if(res.length){
                    for(var i = 0; i<res.length; i++ ){     
                        result1.push(res[i]);
                    }
                }
        callback(null, result1);
        });
        };

        getInformationFromDB(function (err, result1) {});

        selectquery= "SELECT * FROM warenkorb WHERE kid = "+req.session.kid; //result2.length


        var result2 = [];
        var  getInformationFromDB2 = function(callback) {

        con.query(selectquery, function(err, res, fields)
        {
            if (err)  return callback(err);
                console.log(res.length);
                if(res.length){
                    for(var i = 0; i<res.length; i++ ){     
                        result2.push(res[i]);
                    }
                }
        callback(null, result2);
        });
        };


        getInformationFromDB2(function (err, result2) {
            
        


        console.log("Length" +result2.length)
            for (var i = 0; i< result2.length; i++) {
                selectquery ="INSERT INTO rposten (pid, rid , anzahl) VALUES ("+result2[i].pid+","+result1[0].rid+","+result2[i].anzahl+")"
                con.query(selectquery, function (err, result, fields) {
                if (err) throw err;})
            }

            for (var i = 0; i< result2.length; i++) {
                selectquery ="UPDATE is_taken SET booked = 1 WHERE PID = "+result2[i].pid+" and booked = 0";
                con.query(selectquery, function (err, result, fields) {
                if (err) throw err;})
            }

            });

        

        selectquery = "DELETE FROM warenkorb WHERE kid = "+req.session.kid;
        con.query(selectquery, function (err, result, fields) {
        if (err) throw err;
        })
        
        

        res.render("check", {
            loggedin: req.session.loggedin
        })
    
});    


};