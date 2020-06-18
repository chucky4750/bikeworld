
const paypal = require("paypal-rest-sdk");
const { payment } = require('../controllers/Controller.js');


module.exports.routes = (app) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'Ae8GSS5f449rNXtGg-GsIRvjVJvH3nt4uv2xAhg9vevEke7J2_gjOhqbQQxli2X8xQCdl5Lg2s9N4kKZ',
            'client_secret': 'EBMd1cjcUD49CBE-EEUoSOP3tiT4ATJLFbvXHoF8KHxUnlXOSdFCv3JBPy9q5hp03LAbp2okIixIVjHw'
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