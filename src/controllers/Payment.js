var con = require('../connection');
const paypal = require("paypal-rest-sdk");


var globalTotal = 0;


class Payment {

    constructor() {
        this.paypalConfigure();
    }


    paypalConfigure() {
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
            'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
        });
    }

    addToCart(req, res){

        if (req.session.loggedin==null) {
            res.redirect("/login");
        }else{

        var amount = 0;
        var key_saver = [] ;
        var value_saver = [];
        var selectquery = "";
        for (const key in req.query) {
            key_saver [amount] = key;
            value_saver [amount] = req.query[key];
            amount++;
        } 
        
        
       var tempFrom = ""+req.body.datepickerFromProduct;
       var tempTo = ""+req.body.datepickerToProduct;

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

      selectquery = "INSERT INTO warenkorb VALUES ("+value_saver[0]+", "+req.session.kid+", 1, DATE("+tempFrom+"), DATE("+tempTo+"))";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err; })

      selectquery = "INSERT INTO is_taken VALUES ("+value_saver[0]+", DATE("+tempFrom+"), DATE("+tempTo+"), 0)";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err; })

      res.redirect("/cart")

        }
    }

    goToCart(req, res){
        globalTotal=0;
        if (req.session.kid!=null) {
            var selectquery = "SELECT P.pid, P.bildpfad, W.anzahl, P.name, P.preis, YEAR(W.von) AS vonYear, MONTH(W.von) AS vonMonth, DAY(W.von) AS vonDay, YEAR(W.bis) AS bisYear, MONTH(W.bis) AS bisMonth, DAY(W.bis) AS bisDay, ABS(DATEDIFF(W.von, W.bis)-1) AS DateDiff FROM produkt AS P INNER JOIN warenkorb AS W ON P.pid = W.pid WHERE W.kid = "+req.session.kid;

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err;

      for(var i = 0; i<result.length; i++){
        globalTotal += result[i].preis * result[i].DateDiff;
      }

      res.render("cart", {data:result, loggedin: req.session.loggedin
      });
    });

    }else {
        res.
        res.redirect("/login");
    }

    }

    reduce(req, res) { // hier Ajax verwenden

        var amount = 0;
        var key_saver = [] ;
        var value_saver = [];
        var selectquery = "";
        for (const key in req.query) {
            key_saver [amount] = key;
            value_saver [amount] = req.query[key];
            amount++;
        }  

        var selectquery = "SELECT anzahl From warenkorb WHERE PID ="+value_saver[0];
        con.query(selectquery, function (err, result, fields) {
            if (err) throw err;
            console.log(result[0].anzahl); 
            if (result[0].anzahl <= 1){
                var selectquery = "DELETE FROM warenkorb WHERE PID = "+value_saver[0];
                con.query(selectquery, function (err, result, fields) {
                    if (err) throw err; 
                });

            }else {
                var selectquery = "UPDATE warenkorb SET anzahl = anzahl-1 WHERE pid = "+value_saver[0];
                con.query(selectquery, function (err, result, fields) {
                    if (err) throw err;
                     
                });
            }

                var selectquery = "DELETE FROM is_taken WHERE PID ="+value_saver[0]+" AND booked = 0"
                con.query(selectquery, function (err, result, fields) {
                    if (err) throw err;
                     
                });
                res.redirect("/cart");          
        });
    }

    async initalizePayment(req, res){

        if (req.session.loggedin==null) {
            res.render("login");
        }

        var total = globalTotal;

       await this.createPayment(req, res, total);
    }

    async createPayment(req, res, total) {

        const create_payment_json = {

                "intent": "sale",
                "redirect_urls": {
                    "return_url": "http://localhost:3000/success",
                    "cancel_url": "http://localhost:3000/cancel"
                },
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                    {
                        "amount": {
                            "total":total,
                            "currency": "EUR"
                        },
                        "description": "This is the payment transaction description.",
                    },
                ]

            };
        paypal.payment.create(create_payment_json, function(error, payment) {
            if (error) {
                console.log(" the error from here");
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href)

                    }
                }
            }
        });

    }


    async excutePayment(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        console.log(payerId +" and "+ paymentId);

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": globalTotal
                }
            }]
        };

        await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                
                res.redirect("check");
            }
        });


    }

}

exports.Payment = Payment;
