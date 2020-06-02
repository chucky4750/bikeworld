
module.exports.routes = (app) => {

    app.get("/impressum", (req, res) => {
        res.render("impressum", {
            loggedin: req.session.loggedin
        })
    })

};