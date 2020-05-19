var con = require('../connection');
module.exports.routes = (app) => {
    app.get("/", (req, res) => {
            con.query("SELECT * FROM hersteller", function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
        res.render("home", {
        })
    })

}

