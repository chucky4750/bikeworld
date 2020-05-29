var con = require('../connection');
//const {film} = require('../controllers/Controller.js');
module.exports.routes = (app) => {

    app.get('/product', (req, res) => {
        var amount = 0;
        var key_saver = [] ;
        var value_saver = [];
        var selectquery = "";
        for (const key in req.query) {
            key_saver [amount] = key;
            value_saver [amount] = req.query[key];
            amount++;
          }

          if (amount == 1) {
            if (key_saver[0] == "name"){ // im Format ?name=5
                selectquery ="SELECT P.pid, P.name AS Pname, P.beschreibung AS beschreibung, P.preis AS preis, P.bildpfad AS bildpfad, H.name AS Hname, H.web AS web, H.email AS mail  FROM produkt AS P INNER JOIN hersteller AS H ON P.hid = H.hid WHERE P.name = '"+value_saver[0]+"'";
            } 
        }

        con.query(selectquery, function (err, result, fields) {
            if (err) throw err;
            res.render("product", {data:result, vonBis: req.cookies["userData"], loggedin: req.session.loggedin 
            })
            console.log(result);
        });
    })

        .get('/films/:filmId', (req, res) => {
            film.renderFilmInfos(req, res);
        })

        

        .post('/films/:filmId', (req, res) => {

        })

        .patch('/films/:filmId', (req, res) => {
            film.update(req, res);
        })

        .delete('/films/:filmId', (req, res) => {
            film.deleteFilm(req, res);
        })
        .get("/films/:filmId/booking/:bookId", (req, res) => {
            //console.log(req.params)
        });
};


