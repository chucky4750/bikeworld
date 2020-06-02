
module.exports.routes = (app) => {

    app.get("/datenschutz", (req, res) => {
        res.render("datenschutz", {
            loggedin: req.session.loggedin
        })
    })

};