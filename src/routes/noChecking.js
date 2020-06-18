module.exports.routes = (app) => {

    app.get("/cancle", (req, res) => {
        res.render("noCheck", {
            loggedin: req.session.loggedin
        })
    })

}