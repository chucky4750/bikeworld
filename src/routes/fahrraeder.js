var con = require('../connection');
module.exports.routes = (app) => {
    app.get("/fahrraeder", (req, res) => {
        var amount = 0;
        var key_saver = [] ;
        var value_saver = [];
        var selectquery = "";
        for (const key in req.query) {
            key_saver [amount] = key;
            value_saver [amount] = req.query[key];
            amount++;
          }

          if (amount == 1) {
            if (key_saver[0] == "katid"){ // im Format ?katid=5
                selectquery ="SELECT DISTINCT P.name, P.preis, P.beschreibung, P.bildpfad FROM produkt AS P WHERE katid = " +value_saver[0];
            } 

          }else if (amount == 2){ // im Format ?von=5.5&bis
            if (key_saver[0] == "von" && key_saver[1] == "bis") {
              console.log(req.body.datepickerFrom +"till" +req.body.datepickerTo) ;
                //selectquery = "SELECT * FROM produkt WHERE PID NOT IN (SELECT * FROM is_taken WHERE date_from >= "+value_saver[0] +" AND date_to <= "+value_saver[1]+") ";
                selectquery = "SELECT * FROM produkt";
              }
          }

          else {
            selectquery ="SELECT * FROM produkt";
          }
            
          con.query(selectquery, function (err, result, fields) {
            if (err) throw err;
            res.render("fahrraeder", {data:result, loggedin: req.session.loggedin
            })
            //console.log(result);
        });
    });

    app.post("/fahrraeder", (req, res) => {
      
      var tmp1 = ""+req.body.datepickerFrom;
      var tmp2 = ""+req.body.datepickerTo;


      var tempFrom = tmp1;
      var tempTo = tmp2;

      let userDates = { 
        from : tempFrom, 
        to : tempTo
      }

     var tempFromArray = tempFrom.split("/");
     var tempToArray = tempTo.split("/");
       tempFrom ="'";
       tempTo = "'";
     for (var i = tempFromArray.length-1; i>=0; i--) {
       if (i != 0){
       tempFrom += tempFromArray[i]+"-";
       tempTo += tempToArray[i]+"-";
       }
       else{ 
       tempFrom += tempFromArray[i]+"'";
       tempTo += tempToArray[i]+"'";
       }
     }


      console.log(tempFrom +"till" + tempTo);

      res.cookie("userDataFrom", tempFrom);
      res.cookie("userDataTo", tempTo);

      selectquery = "SELECT DISTINCT P.name, P.preis, P.beschreibung, P.bildpfad FROM produkt AS P LEFT JOIN is_taken on P.pid = is_taken.pid WHERE (is_taken.pid IS NULL) OR (NOT "+tempFrom+" BETWEEN von AND bis AND NOT "+tempTo+" BETWEEN von AND bis)"
      //"SELECT * FROM produkt WHERE pid IN (SELECT pid FROM is_taken WHERE (NOT "+tempFrom+" BETWEEN von AND bis AND NOT "+tempTo+" BETWEEN von AND bis) OR (SELECT PID FROM produkt where PID NOT IN (SELECT PID FROM is_taken)))";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err;
      res.render("fahrraeder", {data:result, loggedin: req.session.loggedin
      });
      console.log(result)
    })

    });

    //weitere Queries: SELECT * FROM produkt WHERE Bezeichnung = xxx
    //   2x mit und ohne groesse  SELECT COUNT(*) FROM produkt WHERE Bezeichnung = xxx and groesse = yyy and PID NOT IN (SELECT * FROM is_taken WHERE date_from >= "+value_saver[0] +" AND date_to <= "+value_saver[1]+") "
    //   UPDATE Warenkorb SET KID = Kid and Pid = (SELECT TOP 1 PID FROM produkt WHERE Bezeichnung = xxx and groesse = yyy and PID NOT IN (SELECT * FROM is_taken WHERE date_from >= "+value_saver[0] +" AND date_to <= "+value_saver[1]+") ")
    //   
}