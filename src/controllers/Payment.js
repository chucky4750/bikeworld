var con = require('../connection');
const paypal = require("paypal-rest-sdk");
const {booking, film} = require('./Controller');
const model = require('../models/model');
const Cart = require('../models/cart');

let total = "";
let cart = "";


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
        if (req.session.kid!=null) {
      var selectquery = "SELECT P.pid, W.anzahl, P.name, P.preis, YEAR(W.von) AS vonYear, MONTH(W.von) AS vonMonth, DAY(W.von) AS vonDay, YEAR(W.bis) AS bisYear, MONTH(W.bis) AS bisMonth, DAY(W.bis) AS bisDay, ABS(DATEDIFF(W.von, W.bis)-1) AS DateDiff FROM produkt AS P INNER JOIN warenkorb AS W ON P.pid = W.pid WHERE W.kid = "+req.session.kid;

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err;

      res.render("cart", {data:result, loggedin: req.session.loggedin
      });
    });

    }else {
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

    async renderPayments(req, res){ //--> große Query mit Joins, hier müssen alle Daten zusammengetragen werden, die im Waarenkorb liegen.
        console.log(req.session.cart);
        if (!req.session.cart) {
            res.render("cart", {bookings: null});
        }else {
            const cart = await new Cart(req.session.cart ? req.session.cart : {});
            const cartArray = await cart.generateArray();
            res.render("cart",
                {
                    bookings: cartArray,
                    totalPrice: cart.totalPrice
                });
        }
    }

    async initalizePayment(req, res){

        if (req.session.loggedin==null) {
            res.render("login");
        }

        total = 500; //count query

       await this.createPayment(req, res, total);
        //req.session.destroy();
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

        
        //const bookedFilm = await model.Film.find({title: chosenFilm}).exec();
         //await model.Booking.findOneAndUpdate({title: bookedFilm._id}, {
            //$set: {
                //paymentId: paymentId,
                //price: total
            //}
        //}).exec();

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": 50
                }
            }]
        };

        await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                //console.log(JSON.stringify(payment));
                res.redirect("check");
            }
        });


    }

}

exports.Payment = Payment;
