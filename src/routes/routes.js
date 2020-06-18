"use strict";

const homeRouter = require('./home');
const authenticateRouter = require('./authentication');
const filterRouter = require('./fahrraeder');
const productRouter = require('./product');
const contact = require('./contact');
const payment = require('./payment');
const checker = require('./check');
const imp = require('./impressum');
const dat = require('./datenschutz');
const gut = require('./gutschein');
const noCheck = require('./noChecking');

module.exports.routes = (app) => {

    homeRouter.routes(app);
    authenticateRouter.routes(app);
    filterRouter.routes(app);
    productRouter.routes(app);
    contact.routes(app);
    payment.routes(app);
    checker.routes(app);
    imp.routes(app);
    dat.routes(app);
    gut.routes(app);
    noCheck.routes(app);

}


