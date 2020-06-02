var con = require('../connection');
module.exports.routes = (app) => {
    app.get("/", (req, res) => {
      var day = new Date();

      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    var date = new Date();
      res.cookie("userDataFrom", ""+day.getDate()+"/"+day.getMonth()+1+"/"+day.getFullYear());
      res.cookie("userDataTo", ""+date.addDays(3).getDate()+"/"+(date.addDays(3).getMonth())+1+"/"+date.addDays(3).getFullYear()); //noch bearbeiten

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

