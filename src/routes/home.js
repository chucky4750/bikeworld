var con = require('../connection');
module.exports.routes = (app) => {
    app.get("/", (req, res) => {
            con.query("SELECT * FROM produkt WHERE isHighlight = 1", function (err, result, fields) {
              if (err) throw err
              res.render("home", {
                loggedin: req.session.loggedin,
                data: result
              })
              console.log(result);
            });
    })

}

