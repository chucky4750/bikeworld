var con = require('../connection');
//const {film} = require('../controllers/Controller.js');
module.exports.routes = (app) => {

    app.get('/product', (req, res) => {
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
            if (key_saver[0] == "name"){ // im Format ?name=xxxx
                selectquery ="SELECT P.pid, P.name AS Pname, ("
                +"(SELECT COUNT (name) FROM Produkt WHERE name = '"+value_saver[0]+"') - "
                +"(SELECT COUNT(P.name) FROM produkt AS P LEFT JOIN is_taken on P.pid = is_taken.pid "
                  +"WHERE "+req.cookies['userDataFrom']+" BETWEEN von AND bis AND "+req.cookies['userDataTo']+" BETWEEN von AND bis)) AS anzahl, "
                +"P.Beschreibung_lang AS beschreibung, P.preis AS preis, P.bildpfad AS bildpfad, H.name AS Hname, H.web AS web, H.email AS mail FROM Produkt "
                +"AS P INNER JOIN hersteller AS H ON P.hid = H.hid WHERE P.name = '"+value_saver[0]+"' ORDER BY P.pid ASC";
            } 
        }

        console.log(selectquery);

        con.query(selectquery, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.render("product", {data:result, von: req.cookies["userDataFrom"], bis: req.cookies["userDataTo"], loggedin: req.session.loggedin 
            })
            
        });
    })

    app.post('/redir', (req, res)=>{
      var tmp1 = ""+req.body.datepickerFromProduct;
      var tmp2 = ""+req.body.datepickerToProduct;


      var tempFrom = tmp1;
      var tempTo = tmp2;
      
     

   

      res.cookie("userDataFromUpd", tempFrom, {overwrite: true});
      res.cookie("userDataToUpd", tempTo, {overwrite: true});

      console.log(req.cookies['userDataFromUpd'] +"till" + req.cookies["userDataToUpd"]);

      var amount = 0;
      var key_saver = [] ;
      var value_saver = [];
      var selectquery = "";
      for (const key in req.query) {
          key_saver [amount] = key;
          value_saver [amount] = req.query[key];
          amount++;
        }


        res.redirect("/productUpd/?name="+value_saver[0]);

    })


    app.get('/productUpd', (req, res) => {

      console.log(req.cookies['userDataFromUpd'] +"till" + req.cookies["userDataToUpd"] +"2");

      var amount = 0;
      var key_saver = [] ;
      var value_saver = [];
      var selectquery = "";
      for (const key in req.query) {
          key_saver [amount] = key;
          value_saver [amount] = req.query[key];
          amount++;
        }

        var tempFrom = req.cookies['userDataFromUpd'];
      var tempTo = req.cookies["userDataToUpd"];


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
        
              selectquery ="SELECT P.pid, P.name AS Pname, ("
              +"(SELECT COUNT (name) FROM Produkt WHERE name = '"+value_saver[0]+"') - "
              +"(SELECT COUNT(P.name) FROM produkt AS P LEFT JOIN is_taken on P.pid = is_taken.pid "
                +"WHERE "+tempFrom+" BETWEEN von AND bis OR "+tempTo+" BETWEEN von AND bis)) AS anzahl, "
              +"P.Beschreibung_lang AS beschreibung, P.preis AS preis, P.bildpfad AS bildpfad, H.name AS Hname, H.web AS web, H.email AS mail FROM Produkt "
              +"AS P INNER JOIN hersteller AS H ON P.hid = H.hid WHERE P.name = '"+value_saver[0]+"' ORDER BY P.pid ASC";
           
      

      console.log(selectquery);

      con.query(selectquery, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.render("product", {data:result, von: req.cookies["userDataFromUpd"], bis: req.cookies["userDataToUpd"], loggedin: req.session.loggedin 
          })
          
      });

    });



    app.post('/product', (req, res) => {
        
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

        

        res.cookie("userDataFromUpd", tempFrom, {overwrite: true});
        res.cookie("userDataToUpd", tempTo, {overwrite: true});
  
        res.cookie("userDataFrom", tempFrom, {overwrite: true});
        res.cookie("userDataTo", tempTo, {overwrite: true});

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
            if (key_saver[0] == "name"){ // im Format ?name=xxxx
                selectquery = "SELECT P.pid, P.name AS Pname, (COUNT (P.name) - (SELECT COUNT(P.name) FROM produkt AS P LEFT JOIN is_taken on P.pid = is_taken.pid "
                +"WHERE "+req.cookies['userDataFrom']+" BETWEEN von AND bis OR "+req.cookies['userDataTo']+" BETWEEN von AND bis)) AS anzahl, "
                +"P.Beschreibung_lang AS beschreibung, P.preis AS preis, P.bildpfad AS bildpfad, H.name AS Hname, H.web AS web, H.email AS mail "
                +" FROM Produkt AS P INNER JOIN hersteller AS H ON P.hid = H.hid WHERE P.name = '"+value_saver[0]+"' ORDER BY P.pid ASC"
            } 
        }
  
        con.query(selectquery, function (err, result, fields) {
        if (err) throw err;
        res.render("fahrraeder", {data:result, loggedin: req.session.loggedin
        });
        console.log(result)
      })
  
      });

        
};


