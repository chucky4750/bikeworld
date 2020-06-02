

const users = require('./User.js');
const payments = require('./Payment');

const User = users.User;

const Payment = payments.Payment;

const user = new User();

const payment = new Payment();





module.exports = {
    user    : user,
    payment : payment
};

