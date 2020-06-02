
const paypal = require("paypal-rest-sdk");
const { payment } = require('../controllers/Controller.js');


module.exports.routes = (app) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
        'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
    });


    app.post("/add-to-Cart", (req, res) => {
        payment.addToCart(req, res);
    })

        .get("/reduce", (req, res) => {
            payment.reduce(req, res);
        })


        .get("/cart", (req, res) => {
            payment.goToCart(req, res)
        })

        .post('/payment', (req, res) => {
            payment.initalizePayment(req, res);

        })



        .get("/success", (req, res) => {
            console.log("sucess route")
            //chosenFilm = film.getFilmId();
            payment.excutePayment(req, res);
        })
}