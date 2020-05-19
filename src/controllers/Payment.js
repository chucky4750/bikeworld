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

        var amount = 0;
        var key_saver = [] ;
        var value_saver = [];
        var selectquery = "";
        for (const key in req.query) {
            key_saver [amount] = key;
            value_saver [amount] = req.query[key];
            amount++;
        }  

      selectquery = "INSERT INTO warenkorb VALUES ("+value_saver[0]+", 3, 2)";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err; })

      selectquery = "INSERT INTO is_taken VALUES ("+value_saver[0]+",'1999-01-01','2222-12-31')";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err; })

      this.goToCart(req, res)

      //um zum Cart zu gelangen, müssen alle Informationen Empfnagen werden, die dort Eingespeichert sind für Kund mit kid.--> große Tabelle mit viel Joins
      }

    goToCart(req, res){
      var selectquery = "SELECT * FROM produkt WHERE PID IN (SELECT pid FROM warenkorb WHERE kid = 3)";

      con.query(selectquery, function (err, result, fields) {
      if (err) throw err; 
      res.render("cart", {data:result
      });
    });

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

                var selectquery = "DELETE FROM is_taken WHERE PID ="+value_saver[0]+" AND von = '1999-01-01' AND bis = '2222-12-31'"
                con.query(selectquery, function (err, result, fields) {
                    if (err) throw err;
                     
                });
                res.redirect("/cart");          
        });
    }

    cancelTickt(bookingId) {
        model.Booking.findById(bookingId)
            .then(results => {
                if (results) {
                    model.Session.findByIdAndUpdate(
                        results.session , { $pull: { "reserved": { booking: bookingId} } },
                        { safe: true, upsert: true },
                        function(err, node) {
                            if (err) {
                                console.log(err)
                            }else{
                                console.log(node);
                            }
                        });
                }
            })
            .catch(err => console.log(err));
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

        /*if (!req.session.cart) {
            res.render("cart", {bookings: null});
        } */

        total = this.cart.totalPrice;

       await this.createPayment(req, res, total);
        req.session.destroy();
    }

    async createPayment(req, res, total) {

        const create_payment_json = {

                "intent": "sale",
                "redirect_urls": {
                    "return_url": "http://localhost/success",
                    "cancel_url": "http://localhost/cancel"
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


    async excutePayment(req, res, chosenFilm) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        
        const bookedFilm = await model.Film.find({title: chosenFilm}).exec();
         await model.Booking.findOneAndUpdate({title: bookedFilm._id}, {
            $set: {
                paymentId: paymentId,
                price: total
            }
        }).exec();

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": total
                }
            }]
        };

          /*  const order = await model.CartOrder({
                user: req.user,
                paymentId: paymentId,
                cart: this.cart
            }). save();*/

        await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.render("check", {loggedin: req.isAuthenticated()});
            }
        });


    }

}

exports.Payment = Payment;
