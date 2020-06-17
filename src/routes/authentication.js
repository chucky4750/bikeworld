const controller = require('../controllers/Controller.js');

module.exports.routes = (app) => {

    app.get("/login", (req, res) => {
        if (req.isAuthenticated()) {
            res.render("dummyPage",
                {
                    text: "Your are already logged in"
                });
        } else {
            res.render("login", {
                login: 'Login'
            });
        }

    })

        .post("/login", (req, res) => {
            controller.user.login(req, res);
        })
        .get("/logout", (req, res) => {
            req.session.loggedin=false;
            //desatroy cookies
            res.redirect("/");
        })

        .post("/register", (req, res) => {
            controller.user.createUser(req, res)
        })

        .get("/register", (req, res) => {
            res.render("register")
    })
};


